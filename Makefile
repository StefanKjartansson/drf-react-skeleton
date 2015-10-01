BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
COMMIT=$(git rev-parse --short HEAD)
NODE_BIN=./node_modules/.bin

build:
	./build.sh

test:
	./test.sh

lint:
	${NODE_BIN}/gulp lint

all: lint test build

.PHONY: test lint
