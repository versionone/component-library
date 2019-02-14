#!/usr/bin/env bash

# ---- Required ENV variables ----
# NETLIFY_TOKEN
# GITHUB_USER
# GITHUB_TOKEN
# SHA (commit sha being published)
# ----

if [ -z "$NETLIFY_TOKEN" ]; then echo "NETLIFY_TOKEN is required."; INVALID=1; fi
if [ -z "$GITHUB_USER" ]; then echo "GITHUB_USER is required."; INVALID=1; fi
if [ -z "$GITHUB_TOKEN" ]; then echo "GITHUB_TOKEN is required."; INVALID=1; fi
if [ -z "$SHA" ]; then echo "SHA is required."; INVALID=1; fi

if [ ! -z "$INVALID" ]; then echo "Not all required inputs were provided; halting"; exit 1; fi

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD
${BASH_SOURCE%/*}/stop.sh

docker run --rm --name publishdocs -e NETLIFY_TOKEN=$NETLIFY_TOKEN -e GITHUB_USER=$GITHUB_USER -e GITHUB_TOKEN=$GITHUB_TOKEN -e SHA=$SHA --workdir="/app" -v "$MOUNT":/app node:10-stretch bash -c "./scripts/bin/docker-publish-docs.sh"
