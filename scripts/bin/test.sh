#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD
${BASH_SOURCE%/*}/stop.sh

docker run --rm --name "test" --workdir="/app" -v $MOUNT":/app cypress/base:10 bash -c "NODE_ENV=test yarn test:e2e:ci"
