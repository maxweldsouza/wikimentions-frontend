// Include gulp
var gulp = require('gulp');
var checkPages = require("check-pages");

// Include Our Plugins
var minifyhtml = require('gulp-minify-html');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlprocessor = require('gulp-processhtml');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var uncache = require('gulp-uncache');

var production = process.env.NODE_ENV === 'production';

var sassPaths = [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src'
];

// Javascript
global.assert = require("chai").assert;

gulp.task('js-tests', function () {
    return gulp.src('src/tests/*.js', {read: false})
        .pipe(mocha({
            reporter: 'nyan',
            ui: 'qunit',
        }));
});

gulp.task('es-lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('es-lint-tests', function() {
    return gulp.src('src/tests/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task("browserify", function () {
    return browserify({
        debug: !production,
        fullPaths: true, // set true to use disc to profile module sizes
        entries: ["src/js/client.js"]
    })
    .transform(babelify.configure({
        blacklist: ["es6.classes"]
    }))
    .bundle()
    .on("error", function (err) {
        console.log("Error: " + err.message);
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(gulp.dest("src/js-bundle"))
    .pipe(gulpif(production, uglify()))
    .pipe(gulpif(production, gulp.dest("dist/js-bundle")));
    });

// Scss styles
gulp.task('scss-lint', function() {
    return gulp.src('src/styles/*.scss')
         .pipe(scsslint({
             'config': 'scsslint.yml'
         }));
});

gulp.task('compile-scss', function() {
return gulp.src('src/styles/main.scss')
    .pipe(sass({
        includePaths: sassPaths
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('dist/css'));
});

// Html
gulp.task('preprocess-html', ['browserify', 'compile-scss'], function() {
return gulp.src('src/index.html')
    .pipe(htmlprocessor({}))
    .pipe(uncache({
        append: 'hash',
        rename: true,
        srcDir: 'dist',
        template: '{{path}}{{name}}-{{append}}.{{extension}}',
        distDir: 'dist'
    }))
    .pipe(minifyhtml())
    .pipe(gulp.dest('dist'));
});

// Copy over external libraries
gulp.task('copy-external', function () {
    gulp.src('src/minified/**/*')
    .pipe(gulp.dest('dist/minified'));
    gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js',
        ['browserify', 'js-tests', 'es-lint']);
    gulp.watch('src/tests/*.js',
        ['js-tests', 'es-lint-tests']);
    gulp.watch('src/styles/**/*.scss',
        ['scss-lint', 'compile-scss']);
});

gulp.task("checkDev", [], function(callback) {
  var options = {
    pageUrls: [
      'http://localhost'
    ],
    checkLinks: true,
    onlySameDomain: true,
    queryHashes: false,
    noRedirects: true,
    noLocalLinks: false,
    noEmptyFragments: true,
    linksToIgnore: [],
    checkXhtml: false,
    checkCaching: false,
    checkCompression: false,
    maxResponseTime: 200,
    userAgent: 'custom-user-agent/1.2.3',
    summary: true
  };
  checkPages(console, options, callback);
});

gulp.task("checkProd", function(callback) {
  var options = {
    pageUrls: [
      'http://example.com/',
      'http://example.com/blog',
      'http://example.com/about.html'
    ],
    checkLinks: true,
    maxResponseTime: 500
  };
  checkPages(console, options, callback);
});

// Default Task
var devtasks = ['es-lint', 'es-lint-tests', 'js-tests', 'browserify', 'scss-lint', 'compile-scss', 'copy-external', 'watch'];
var prodtasks = ['es-lint', 'es-lint-tests', 'js-tests', 'browserify', 'scss-lint', 'compile-scss', 'copy-external', 'preprocess-html'];
if (production) {
    gulp.task('default', prodtasks);
} else {
    gulp.task('default', devtasks);
}
