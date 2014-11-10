'use strict'

var entityconvert = require('entity-convert'),
    gutil         = require('gulp-util'),
    map           = require('map-stream')

module.exports = function (options) {

  options = options || {}
  var converted = null

  return map(function (file, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError('gulp-entity-convert', 'Streaming not supported'))
    }

    var toConvert = String(file.contents)

    switch (options.type) {
      case 'css':
        converted = entityconvert.css(toConvert)
        break
      case 'html':
      default:
        converted = entityconvert.html(toConvert)
        break
    }

    file.contents = new Buffer(converted)
    cb(null, file)

  })
}
