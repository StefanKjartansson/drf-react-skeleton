#!/bin/bash

set -e

if [ "$TRAVIS_BRANCH" != "master" ]; then
    exit 0
fi

NAME=${PROJECT:-project}
DIST_PATH=${DIST_PATH:-"$NAME"/static/"$NAME"}
OWNER_UID=$(id -u)
BRANCH=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
IS_PRODUCTION=0
if [ "$BRANCH" = "master" ]; then IS_PRODUCTION=1; fi
script_name=$0

function log() {
    function logline() {
        colorprint $1 "[$script_name] $2: $3"
    }

    case $1 in
        INFO)
            logline "1;37" "$1" "$2" ;;
        WARN)
            logline 33 "$1" "$2" >&2 ;;
        ERROR)
            logline 31 "$1" "$2" >&2 ;;
        DEBUG)
            logline 0 "$1" "$2" ;;
        SUCCESS)
            logline "32" "$1" "$2" ;;
        *)
            log "ERROR" "unknown log level"
            return 1
            ;;
    esac
}

function colorprint() {
    # $1 = color number, for example 31, 33, 1;37
    # $2 = message to be echoed
    echo -e "\033[$1m$2\033[0m" 
}

function frontend {
    log "INFO" "Starting ${FUNCNAME[0]}"
    local image="$NAME"-fe
    local target="$PWD"/"$DIST_PATH"
    # TODO add IS_PRODUCTION
	docker build \
		-t $image \
		-f docker/frontend.docker \
		.
    rm -rf $target/*.*
	docker run \
		--rm \
		-v $target:/usr/src/app/"$DIST_PATH" \
		$image \
        sh -c "npm run build && chown -R $OWNER_UID:$OWNER_UID ."
    gzip --keep $target/*.js
    log "SUCCESS" "Finished ${FUNCNAME[0]}"
}

function wheelhouse {
    log "INFO" "Starting ${FUNCNAME[0]}"
    local image="$NAME"-wheel
    local cache_file=requirements.txt
	docker build \
		-t $image \
		-f docker/wheel.docker \
		.
	mkdir -p wheelhouse
	docker run \
		--rm \
		-v "$(pwd)"/wheelhouse:/wheelhouse \
		$image
	log "SUCCESS" "Finished ${FUNCNAME[0]}"
}

function app {
    log "INFO" "Starting ${FUNCNAME[0]}"
    local image="$NAME"-application
    docker build \
        -t $image \
        -f docker/app.docker \
        .
    log "SUCCESS" "Finished ${FUNCNAME[0]}"
}

frontend
wheelhouse
app
