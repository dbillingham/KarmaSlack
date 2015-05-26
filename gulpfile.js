var gulp = require("gulp"),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require("gulp-babel"),
	path = require('path');

var paths = {
    es6: ['es6/**/*.js'],
    es5: 'es5',
    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, 'es6'),
};

gulp.task('babel', function () {
    return gulp.src(paths.es6)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.',
                  { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.es5));
});

gulp.task('watch', function() {
    gulp.watch(paths.es6, ['babel']);
});

gulp.task('default', ['watch']);

/*	
gulp.task("one", function(){
	return gulp.src("app3.js")
		.pipe(babel())
		.pipe(gulp.dest("dist"));
});

gulp.task("two", function(){
	//run('echo Hello World').exec()
});

gulp.task('default', ['one', 'two']);
*/