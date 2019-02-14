#!/usr/bin/env bash

# ---- Required ENV variables ----
# NETLIFY_TOKEN
# GITHUB_USER
# GITHUB_TOKEN
# SHA (commit sha being published)
# ----

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD
${BASH_SOURCE%/*}/stop.sh

docker run --rm --name publishdocs -e NETLIFY_TOKEN=$NETLIFY_TOKEN -e GITHUB_USER=$GITHUB_USER -e GITHUB_TOKEN=$GITHUB_TOKEN -e SHA=$SHA --workdir="/app" -v "$MOUNT":/app node:10-stretch bash -c "./scripts/bin/docker-publish-docs.sh"
