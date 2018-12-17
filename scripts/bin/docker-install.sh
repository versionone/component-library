#!/usr/bin/env bash

yarn --frozen-lockfile
yarn bootstrap

if [ "$NODE_ENV" = "test" ]; then
  yarn cypress verify
fi
