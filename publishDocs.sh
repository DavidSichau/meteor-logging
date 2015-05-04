#!/usr/bin/env bash

set -e
set -u

git config --global user.email "pele@ethz.ch"
git config --global user.name "Pele Robot"

rm -rf .docs || true

branch=$(git rev-parse --abbrev-ref HEAD)

yuidoc .
rm yuidoc.json
rm -rf /tmp/docs/
mv ./.docs /tmp/docs
#save the build files
git remote set-branches --add origin gh-pages
git fetch
git checkout gh-pages
# Remove everything but .git
rm -r *
mv /tmp/docs/* ./
git add --all .
git commit --message "Update docs [skip ci]"
git push --force origin gh-pages
git checkout $branch
