#!/bin/bash

# echo shell commands as they are executed
set -x

# get pkg version so we can use it in the commit message later
pkg_version=$(cat package.json | grep -oE "\"version\":.*" | sed -e 's/\"version\": \"//g' -e 's/\".//g')
echo "version from package.json: ${pkg_version}"

git checkout os-pages

cp -r build/* .

ls -la

# remove unneeded stuff
rm -r build reports

ls -la

git status

# commit the latest docs
git commit -a -m "docs: Automatic generation of latest docs for release ${pkg_version}"
