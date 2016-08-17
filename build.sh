#!/bin/bash

set -e
# set -x

NAME=${PROJECT:-project}
DIST_PATH=${DIST_PATH:-"$NAME"/static/"$NAME"}
OWNER_UID=$(id -u)
BRANCH=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
IS_PRODUCTION=0
if [ "$BRANCH" = "master" ]; then IS_PRODUCTION=1; fi

. color_log.sh

function sum {
    md5sum $1 | cut -d ' ' -f 1
}

function has_changed {
    mkdir -p .cache
    local p="$PWD/.cache/$1"
    if [ ! -f "$p" ]; then
        echo "true"
        return
    fi
    n=$(sum $1)
    o=$(cat $p)
    if [ "$n" == "$o" ]; then
        echo "false"
    else
        echo "true"
    fi
}

function npm_cache {
    log "INFO" "Starting ${FUNCNAME[0]}"
    local cache_image="$NAME"-npm
    local cache_dir=node_modules
    local cache_file=package.json
    if [ "$(has_changed $cache_file)"  == "false" ]; then
        log "SUCCESS" "Skipping ${FUNCNAME[0]} because $cache_file is unchanged"
    else
        docker build \
            -t $cache_image \
            -f docker/npm.docker \
            .
        mkdir -p $cache_dir
        docker run \
            --rm \
            -v "$(pwd)"/$cache_dir:/usr/src/app/$cache_dir \
            $cache_image
        echo $(sum "$cache_file") > .cache/$cache_file
        log "SUCCESS" "Finished ${FUNCNAME[0]}"
    fi
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
    if [ "$(has_changed $cache_file)"  == "false" ]; then
        log "SUCCESS" "Skipping ${FUNCNAME[0]} because $cache_file is unchanged"
    else
        docker build \
            -t $image \
            -f docker/wheel.docker \
            .
        mkdir -p wheelhouse
        docker run \
            --rm \
            -v "$(pwd)"/wheelhouse:/wheelhouse \
            $image
        echo $(sum "$cache_file") > .cache/$cache_file
        log "SUCCESS" "Finished ${FUNCNAME[0]}"
    fi
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

npm_cache
frontend
wheelhouse
app
