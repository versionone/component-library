#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD

docker run --rm --name verify -v "$MOUNT":/app cypress/base:10 bash -c "cd app && ./scripts/bin/docker-verify.sh"
