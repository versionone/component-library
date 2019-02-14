#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD
${BASH_SOURCE%/*}/stop.sh

docker run --rm --name lint --workdir="/app" -v "$MOUNT":/app cypress/base:10 bash -c "yarn lint"
