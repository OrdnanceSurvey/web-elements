# OS Elements Home

[![circleci](https://circleci.com/gh/OrdnanceSurvey/web-elements.svg?&style=shield&circle-token=ff38e8886514d95323b81a98bfe110412c4a188a)](https://circleci.com/gh/OrdnanceSurvey/web-elements) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Sauce Labs status:
[![Build Status](https://saucelabs.com/open_sauce/build_matrix/craigsnyders.svg)](https://saucelabs.com/beta/builds/c9e6854a179d4f5baa79c940438732bd)
## initial setup for development
``` bash
npm install
typings install
npm run build
http-server -p 8080 .
```
now visit localhost:8080/demos/basic

## other tasks for development
``` bash
webpack
webpack --config webpack.demos.config.js
```
## unit testing
``` bash
npm test
```

## test driven development
``` bash
npm run test-watcher
[you may edit source and unit test, all changes will be automatically detected and cover by tests]
```

## documentation
```
npm run build
http-server -p 8080 .
# open chrome to localhost:8080/docs/
`
