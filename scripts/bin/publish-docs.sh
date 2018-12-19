#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD

docker run -it --rm --name publish-docs -e NETLIFY_TOKEN=$NETLIFY_TOKEN -e GITHUB_USER=$GITHUB_USER -e GITHUB_TOKEN=$GITHUB_TOKEN -e SHA=$SHA -v "$MOUNT":/app node:10-stretch bash -c "cd app &&  ./scripts/bin/docker-publish-docs.sh"
