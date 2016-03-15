# OS Elements Home

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


