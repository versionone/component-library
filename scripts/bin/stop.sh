#!/usr/bin/env bash

docker kill install > /dev/null 2>&1
docker rm install > /dev/null 2>&1

docker kill docz > /dev/null 2>&1
docker rm docz > /dev/null 2>&1

docker kill lint > /dev/null 2>&1
docker rm lint > /dev/null 2>&1

docker kill test > /dev/null 2>&1
docker rm test > /dev/null 2>&1

docker kill publish > /dev/null 2>&1
docker rm publish > /dev/null 2>&1

docker kill publishdocs > /dev/null 2>&1
docker rm publishdocs > /dev/null 2>&1
