#!/usr/bin/env bash

NODE_ENV=production yarn build

if [ $NEXT ];
then
  echo "Publishing release to NPM...."
  monorepo-utils-publish --ci -dist-tag next --dry
else
  echo "Publishing release to NPM...."
  monorepo-utils-publish --ci --dry
fi
