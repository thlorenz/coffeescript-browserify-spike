'use strict';
var CoffeeScript = require('coffee-script')
  , convert = require('./convert-source-map');

function inspect(obj, depth) {
  console.log(require('util').inspect(obj, false, depth || 5, true));
}

function inlineSourceContent(jsonmap, source) {
  var sourcemap = JSON.parse(jsonmap);
  sourcemap.sourcesContent = [ source ];
  return JSON.stringify(sourcemap);
}

var src = 'sayHi = (name) -> \n    console.log "hello world: " + name \n\nsayHi("browserify")\n\n# some comment\nsayHi("coffe-script")'
  , inputName = 'test.coffee';

var res = CoffeeScript.compile(src, { sourceMap: true, filename: inputName });
var comment = convert
  .fromJSON(res.v3SourceMap)
  .setProperty('sourcesContent', [ src ])
  .toComment();

console.log(res.js + '\n' + comment);
