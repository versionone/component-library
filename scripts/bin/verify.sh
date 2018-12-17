#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD

docker run -it --rm --name verify -v "$MOUNT":/app cypress/base:10 bash -c "cd app && yarn cypress install && yarn verify"
