#!/usr/bin/env bash

docker run -it --rm --name publish -v "$PWD":/app -w /app node:10 ./scripts/bin/docker-publish.sh
