#!/usr/bin/env bash

[[ "$OSTYPE" == *"win"* || "$OSTYPE" == "msys" ]] && MOUNT="/$PWD" || MOUNT=$PWD

if [ ! -d "node_modules" ]; then
  ${BASH_SOURCE%/*}/install.sh
fi

${BASH_SOURCE%/*}/stop.sh

PORT="${PORT:-3000}"
POLL="${POLL:-1000}"

docker run -it -p 3000:$PORT --workdir="/app" -e HOST="0.0.0.0" -e DEBUG=$DEBUG -e PORT=$PORT -e POLL=$POLL --name docz -v "$MOUNT":/app node:10-stretch bash -c "yarn start"
