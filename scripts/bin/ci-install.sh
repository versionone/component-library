#!/usr/bin/env bash

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

NODE_ENV=build yarn
yarn bootstrap
