#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD
${BASH_SOURCE%/*}/stop.sh

docker run --rm --name install --workdir="/app" -v "$MOUNT":/app node:10-stretch bash -c "./scripts/bin/docker-install.sh"
