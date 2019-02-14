#!/usr/bin/env bash

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

yarn test:e2e:ci

kill $(jobs -p) || true
