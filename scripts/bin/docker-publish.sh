#!/usr/bin/env bash

NODE_ENV=production
yarn build

TYPE=${PUBLISH_TYPE-patch}

echo "Publishing ${TYPE} release to NPM...."
yarn lerna publish ${TYPE} --yes
