#!/usr/bin/env bash

yarn --frozen-lockfile
yarn bootstrap
yarn build

NODE_ENV=test
yarn verify
