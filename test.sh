#!/bin/bash

testfile=${1-all}

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
