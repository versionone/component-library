#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD

docker run --rm --name install -v "$MOUNT":/app node:10-stretch bash -c "cd app && ./scripts/bin/docker-install.sh"
