'use strict'

var assert = require('assert'),
    gutil  = require('gulp-util'),
    gec    = require('../')

// Tests mimic suite from entity-convert
// https://github.com/m90/entity-convert/blob/master/test.js

describe('gulp-entity-convert', function () {
  describe('html', function () {

    it('should convert special characters to html entities', function (done) {
      var contents = 'We äll löve Ümläutß!',
          expected = 'We &#228;ll l&#246;ve &#220;ml&#228;ut&#223;!'

      var stream = gec({ type: 'html' })
      stream.once('data', function (file) {
        assert.equal(file.contents, expected)
      })
      stream.on('end', done)
      stream.write(new gutil.File({
        contents: new Buffer(contents)
      }))
      stream.end()
    })

    it('should leave latin input untouched', function (done) {
      var contents = 'abcdefghijklmnopqrstuvwxyz',
          expected = 'abcdefghijklmnopqrstuvwxyz'

      var stream = gec({ type: 'html' })
      stream.once('data', function (file) {
        assert.equal(file.contents, expected)
      })
      stream.on('end', done)
      stream.write(new gutil.File({
        contents: new Buffer(contents)
      }))
      stream.end()
    })

    it('should leave wrapping html untouched', function (done) {
      var contents = '<span class="foo" data-foo>Ümläut</span>',
          expected = '<span class="foo" data-foo>&#220;ml&#228;ut</span>'

      var stream = gec({ type: 'html' })
      stream.once('data', function (file) {
        assert.equal(file.contents, expected)
      })
      stream.on('end', done)
      stream.write(new gutil.File({
        contents: new Buffer(contents)
      }))
      stream.end()
    })
  })

  describe('css', function () {

    it('should convert special characters to css entities', function (done) {
      var contents = 'We äll löve Ümläutß!',
          expected = 'We \\00e4ll l\\00f6ve \\00dcml\\00e4ut\\00df!'

      var stream = gec({ type: 'css' })
      stream.once('data', function (file) {
        assert.equal(file.contents, expected)
      })
      stream.on('end', done)
      stream.write(new gutil.File({
        contents: new Buffer(contents)
      }))
      stream.end()
    })

    it('should leave latin input untouched', function (done) {
      var contents = 'abcdefghijklmnopqrstuvwxyz',
          expected = 'abcdefghijklmnopqrstuvwxyz'

      var stream = gec({ type: 'css' })
      stream.once('data', function (file) {
        assert.equal(file.contents, expected)
      })
      stream.on('end', done)
      stream.write(new gutil.File({
        contents: new Buffer(contents)
      }))
      stream.end()
    })

    it('should leave css selectors untouched', function (done) {
      var contents = 'p.foo#bar::before{content:\'Ümläut\';}',
          expected = 'p.foo#bar::before{content:\'\\00dcml\\00e4ut\';}'

      var stream = gec({ type: 'css' })
      stream.once('data', function (file) {
        assert.equal(file.contents, expected)
      })
      stream.on('end', done)
      stream.write(new gutil.File({
        contents: new Buffer(contents)
      }))
      stream.end()
    })
  })

  describe('default', function () {

    it('should default to converting html entities if no type option is specified', function (done) {
      var contents = 'We äll löve Ümläutß!',
          expected = 'We &#228;ll l&#246;ve &#220;ml&#228;ut&#223;!'

      var stream = gec()
      stream.once('data', function (file) {
        assert.equal(file.contents, expected)
      })
      stream.on('end', done)
      stream.write(new gutil.File({
        contents: new Buffer(contents)
      }))
      stream.end()
    })
  })
})
