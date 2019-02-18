#!/usr/bin/env bash

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

npm install -g yarn@^1.13.0
yarn
yarn bootstrap
