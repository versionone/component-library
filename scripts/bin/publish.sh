#!/usr/bin/env bash

# ---- Required ENV variables ----
# NPM_USER
# NPM_PASS
# NPM_EMAIL
# ----


if [ -z "$NPM_USER" ]; then echo "NPM_USER is required."; INVALID=1; fi
if [ -z "$NPM_PASS" ]; then echo "NPM_PASS is required."; INVALID=1; fi
if [ -z "$NPM_EMAIL" ]; then echo "NPM_EMAIL is required."; INVALID=1; fi

if [ ! -z "$INVALID" ]; then echo "Not all required inputs were provided; halting"; exit 1; fi

docker run -e NPM_USER=$NPM_USER -e NPM_PASS=$NPM_PASS -e NPM_EMAIL=$NPM_EMAIL bravissimolabs/generate-npm-authtoken > ~/.npmrc

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD
${BASH_SOURCE%/*}/stop.sh

docker run --rm --name publish --workdir="/app" -v "$MOUNT":/app -e PUBLISH_TYPE=$PUBLISH_TYPE node:10-stretch bash -c "./scripts/bin/docker-publish.sh"
