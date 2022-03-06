#!/bin/sh

DIRS=$(find ./ -type d -mindepth 1 -maxdepth 1 | grep -v "_common")

for dir in $DIRS; do
  cp -r _common/. "$dir"
done
