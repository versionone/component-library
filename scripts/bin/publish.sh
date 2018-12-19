#!/usr/bin/env bash

# ---- Required ENV variables ----
# NPM_USER
# NPM_PASS
# NPM_EMAIL
# ----

docker run -e NPM_USER=$NPM_USER -e NPM_PASS=$NPM_PASS -e NPM_EMAIL=$NPM_EMAIL bravissimolabs/generate-npm-authtoken > ~/.npmrc

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD

docker run -it --rm --name publish -v "$MOUNT":/app node:10-stretch bash -c "cd app &&  ./scripts/bin/docker-publish.sh"
