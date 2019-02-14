#!/usr/bin/env bash

echo "Building docs site..."
yarn build:website

wget -qO- 'https://cli.netlify.com/download/latest/linux' | tar xz

echo "Publishing docs site..."

if [ $PROD ];
then
  PUBLISH_URL=$(./netlifyctl -A "$NETLIFY_TOKEN" deploy | grep https.*com$ | sed 's/^ *//;s/$//')
  PUBLISH_TYPE="Production"
else
  PUBLISH_URL=$(./netlifyctl -A "$NETLIFY_TOKEN" deploy --draft | grep https.*com$ | sed 's/^ *//;s/$//')
  PUBLISH_TYPE="Preview"
fi

echo -e "PUBLISH_URL='$PUBLISH_URL'"

echo 'Update GitHub status...'
UPDATE_STATUS_CMD=$(cat <<-END
  curl -u "$GITHUB_USER:$GITHUB_TOKEN" -X POST -d '{
    "state": "success",
    "target_url": "$PUBLISH_URL",
    "description": "$PUBLISH_TYPE Deployment URL",
    "context": "Deployment/$PUBLISH_TYPE"
  }' -H "Content-Type: application/json" "https://api.github.com/repos/versionone/component-library/statuses/$SHA"
END
)

eval $UPDATE_STATUS_CMD
