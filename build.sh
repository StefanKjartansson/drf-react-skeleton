#!/bin/bash

NAME=${PROJECT:-project}
DIST_PATH=${DIST_PATH:-"$NAME"/static/"$NAME"}
OWNER_UID=$(id -u)

docker build -t frontend-"$NAME" -f frontend.build.docker .

docker run \
    -v "$PWD"/"$DIST_PATH":/usr/src/app/"$DIST_PATH" \
    frontend-"$NAME" \
    sh -c "./node_modules/.bin/gulp build && chown -R $OWNER_UID:$OWNER_UID ."

docker build \
    -t "$NAME" \
    -f app.docker \
    .
