#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD

docker run -it --rm --name publish -v "$MOUNT":/app node:10-stretch bash -c "cd app &&  ./scripts/bin/docker-publish.sh"
