#!/usr/bin/env bash

yarn --frozen-lockfile
yarn bootstrap

NODE_ENV=production
yarn build
BASE_URL=component-library yarn docz build

TYPE=${PUBLISH_TYPE-patch}

echo "Publishing ${TYPE} to NPM...."
echo "yarn lerna publish ${PUBLISH_TYPE} --yes"

echo "Publishing docs..."
echo "yarn gh-pages -d ./.docz/dist"
