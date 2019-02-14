#!/usr/bin/env bash

# ---- Required ENV variables ----
# NPM_USER
# NPM_PASS
# NPM_EMAIL
# ----

docker run -e NPM_USER=$NPM_USER -e NPM_PASS=$NPM_PASS -e NPM_EMAIL=$NPM_EMAIL bravissimolabs/generate-npm-authtoken > ~/.npmrc

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD
${BASH_SOURCE%/*}/stop.sh

docker kill publish
docker run --rm --name publish --workdir="/app" -v "$MOUNT":/app -e PUBLISH_TYPE=$PUBLISH_TYPE node:10-stretch bash -c "./scripts/bin/docker-publish.sh"
