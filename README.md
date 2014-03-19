# [gulp](https://github.com/wearefractal/gulp)-entity-convert

Gulp wrapper for [entity-convert](https://www.npmjs.org/package/entity-convert). Converts Unicode characters to either [HTML or CSS entities](http://brajeshwar.github.io/entities/). Useful if your built files eventually go to a system that can't handle Unicode character sets.


## Install

Install with [npm](https://npmjs.org/package/gulp-entity-convert)

```
npm install --save-dev gulp-entity-convert
```


## Example

```js
var gulp = require('gulp');
var entityconvert = require('gulp-entity-convert');

gulp.task('default', function () {
	gulp.src('./src/**/*.html')
		.pipe(entityconvert())
		.pipe(gulp.dest('.build/'));
});
```

## Options

By default, this plugin treats all input files as HTML and will convert characters to HTML entities. You can pass in an options object with the `type` property to specify either HTML or CSS, like so:

```js
  .pipe(entityconvert({ type: 'css' }))
```

or if you want to be specific:

```js
  .pipe(entityconvert({ type: 'html' }))
```


## License

MIT
