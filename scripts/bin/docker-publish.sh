#!/usr/bin/env bash

yarn --frozen-lockfile
yarn bootstrap

NODE_ENV=production
yarn build
BASE_URL=component-library yarn docz build

TYPE=${PUBLISH_TYPE-patch}

echo "Publishing ${TYPE}...."
# echo "yarn lerna publish ${PUBLISH_TYPE} --yes"
