require('../../src/components/zoombar/mdl-slider.css');
require('../../src/elements.styl');
require('../../src/elements.ts');
require('../../node_modules/material-design-lite/material.min.js');


// load all unit tests
var testsContext = require.context(".", true, /_test\.js$/);
testsContext.keys().forEach(testsContext);

