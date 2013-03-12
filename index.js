'use strict';
var CoffeeScript = require('coffee-script-redux').CoffeeScript;

var src = 'console.log "hello world"'
  , inputName = 'test.coffee';

var parsed = CoffeeScript.parse(src, {
    optimise: false
  , raw: true // options.raw || options['source-map'] || options['source-map-file'] || options['eval'],
  , inputSource: inputName
});

var ast = CoffeeScript.compile(parsed)
  , sourceMap = CoffeeScript.sourceMap(ast, inputName, { compact: false });
