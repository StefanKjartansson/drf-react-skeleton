#!/bin/bash

set -e

NAME=${PROJECT:-project}
DJANGO_SETTINGS_MODULE="$NAME".settings
SECRET_KEY=${SECRET_KEY:-foobar}
DATABASE_URL=${DATABASE_URL:-"postgres://ubuntu:@localhost/$PROJECT"}

DJANGO_SETTINGS_MODULE="$DJANGO_SETTINGS_MODULE" SECRET_KEY="$SECRET_KEY" DATABASE_URL="$DATABASE_URL" py.test

testfile=${1:-all}

if [ "$testfile" = "all" ]
then
    ./node_modules/.bin/gulp compile-test
fi
./node_modules/.bin/gulp test-server &
SERVER_PID=$(echo $!)
echo "gulp pid is $SERVER_PID"
echo "sleeping for 5 seconds"
sleep 5
phantomjs phantom-runner.js http://localhost:8080/integration-tests/"$testfile".html
STATUS=$(echo $?)
echo "Killing server with pid $SERVER_PID"
kill "$SERVER_PID"
echo "Exiting with status: $STATUS"
exit "$STATUS" 
