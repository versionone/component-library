#!/usr/bin/env bash

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

if [ $PROD ]; then
  yarn --frozen-lockfile
else
  yarn
fi

yarn bootstrap
