var

    /**
     * The path of the source files in order of occurrence.
     * @type {string[]}
     */
    files = [
        './src/module.js',
        './src/services/**/*.js',
        './src/controllers/**/*.js',
        './src/components/**/*.js'
    ],

    styles = [
        './src/style.css'
    ],

    /**
     * The output directory of the compiled files.
     * @type {string}
     */
    output = './bin',

/* ---------------- *
 * Task definitions *
 * ---------------- */

    name = require('./package.json').name,

    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');

if (name.indexOf('/') > -1) {
    name = name.slice(name.indexOf('/') + 1);
}

gulp.task('compile', function (cb) {
    gulp.src(files)
        .pipe(concat(name + '.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(output))
        .on('end', cb);
});

gulp.task('compile-minified', function (cb) {
    gulp.src(files)
        .pipe(concat(name + '.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(output))
        .on('end', cb);
});

gulp.task('copy-styles', function (cb) {
    gulp.src(styles)
        .pipe(concat(name + '.css'))
        .pipe(gulp.dest(output))
        .on('end', cb);
});

gulp.task('default', ['compile', 'compile-minified', 'copy-styles']);
