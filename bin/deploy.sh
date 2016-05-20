#!/bin/bash

# Exit if any subcommand fails.
set -e

ORIGIN_URL=`git config --get remote.origin.url`
COMMIT_MESSAGE=$(git log -1 --pretty=%B)

echo "Started building static content"
# Build site.
npm run build


echo "Started deploying"
# Push dist to gh-pages.
cd dist
git init
git remote add origin $ORIGIN_URL

git config user.name "$USERNAME"
git config user.email "$EMAIL"

git add -fA
git commit --allow-empty -m "$COMMIT_MESSAGE [ci skip]"
git push -f gh-pages

echo "Deployed Successfully!"

exit 0
