#!/bin/bash

# Exit if any subcommand fails.
set -e

USERNAME=gaboesquivel
EMAIL=contact@gaboesquivel.com
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GITHUB_TOKEN@github.com}
COMMIT_MESSAGE=$(git log -1 --pretty=%B)

echo "Started deploying"

# Build site.
gulp build

# Push dist to master.
cd dist
git init
git remote add origin $ORIGIN_URL

git config user.name "$USERNAME"
git config user.email "$EMAIL"

git add -fA
git commit --allow-empty -m "$COMMIT_MESSAGE [ci skip]"
git push -f -q $ORIGIN_CREDENTIALS master

# Move back to previous branch.
git checkout -

echo "Deployed Successfully!"

exit 0
