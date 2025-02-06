#!/bin/bash

# this script will just copy the files from here to the location they get executed
# from in ah-applications-nx when the sls jobs are deployed.  good to use while
# testing several iterations of changes
cp src/index.js ../ah-applications-nx/node_modules/serverless-plugin-optimize/src/
cp src/replace-imports.js ../ah-applications-nx/node_modules/serverless-plugin-optimize/src/