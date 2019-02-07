#!/usr/bin/env bash

yarn --frozen-lockfile
yarn bootstrap
yarn add -W --dev cypress

NODE_ENV=test yarn verify
