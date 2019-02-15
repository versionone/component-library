#!/usr/bin/env bash

yarn add -W --dev cypress
RUN_URL=$(yarn test:e2e:ci | grep https.*com$ | sed 's/^ *//;s/$//')

echo "See test results at: $RUN_URL"

echo 'Update GitHub status with cypress run URL...'
UPDATE_STATUS_CMD=$(cat <<-END
  curl -u "$GITHUB_USER:$GITHUB_TOKEN" -X POST -d '{
    "state": "success",
    "target_url": "$RUN_URL",
    "description": "Cypress Test Run URL",
    "context": "Test/Cypres"
  }' -H "Content-Type: application/json" "https://api.github.com/repos/versionone/component-library/statuses/$SHA"
END
)

eval $UPDATE_STATUS_CMD
