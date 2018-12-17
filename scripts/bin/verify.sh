#!/usr/bin/env bash

docker run -it --rm --name verify -v "$PWD":/app -w /app cypress/base:10 yarn cypress install && yarn verify
