// Include gulp
import gulp from 'gulp';

import checkPages from 'check-pages';

// Include Our Plugins
import minifyhtml from 'gulp-htmlmin';

import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import scsslint from 'gulp-scss-lint';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import htmlprocessor from 'gulp-processhtml';
import autoprefixer from 'gulp-autoprefixer';
import minifycss from 'gulp-clean-css';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpif from 'gulp-if';
import uncache from 'gulp-uncache';
import git from 'git-rev';
import fs from 'fs';

const production = process.env.NODE_ENV === 'production';

const sassPaths = [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src'
];

// Javascript
global.assert = require('chai').assert;

gulp.task('git-rev', () => {
    git.long(str => {
        if (production) {
            const GIT_REV_HASH = str;
            console.log(`git-rev: ${GIT_REV_HASH}`);
            fs.writeFile('.GIT_REV_HASH', GIT_REV_HASH, err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
    return;
});

gulp.task('js-tests', () => gulp.src('src/tests/*.js', {read: false})
    .pipe(mocha({
        reporter: 'nyan',
        ui: 'qunit'
    })));

gulp.task('es-lint', () => gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format()));

gulp.task('es-lint-tests', () => gulp.src('src/tests/*.js')
    .pipe(eslint())
    .pipe(eslint.format()));

const plugins = [
    // react
    'syntax-flow',
    'syntax-jsx',
    'transform-flow-strip-types',
    'transform-react-jsx',
    'transform-react-display-name',
    'transform-react-constant-elements',
    'transform-object-rest-spread',
    'transform-class-properties'
];
if (production) {
    plugins.push('transform-react-inline-elements');
}

gulp.task('browserify', () => browserify({
    debug: !production,
    fullPaths: true, // set true to use disc to profile module sizes
    entries: ['src/js/client.js']
})
.transform(babelify.configure({
    plugins,
    presets: ['es2015', 'react']
}))
.bundle()
.on('error', err => {
    console.log(`Error: ${err.message}`);
})
.pipe(source('bundle.js'))
.pipe(buffer())
.pipe(gulp.dest('src/assets/js'))
.pipe(gulpif(production, uglify()))
.pipe(gulpif(production, gulp.dest('dist/assets/js'))));

// Scss styles
gulp.task('scss-lint', () => gulp.src('src/styles/*.scss')
     .pipe(scsslint({
         'config': 'scsslint.yml'
     })));

gulp.task('compile-scss', () => gulp.src('src/styles/main.scss')
.pipe(sass({
    includePaths: sassPaths
}))
.pipe(gulp.dest('src/assets/css'))
.pipe(autoprefixer())
.pipe(gulp.dest('src/assets/css')));

gulp.task('compile-scss-production', () => gulp.src('src/styles/main.scss')
.pipe(sass({
    includePaths: sassPaths
}))
.pipe(autoprefixer())
.pipe(minifycss())
.pipe(rename('main.css'))
.pipe(gulp.dest('src/assets/css')));

// Html
gulp.task('preprocess-html', ['browserify', 'compile-scss-production'], () => gulp.src('src/index.html')
.pipe(htmlprocessor({}))
.pipe(uncache({
    append: 'hash',
    rename: true,
    srcDir: 'dist',
    template: '{{path}}{{name}}-{{append}}.{{extension}}',
    distDir: 'dist'
}))
.pipe(minifyhtml({
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true
}))
.pipe(gulp.dest('dist')));

// Copy over external libraries
gulp.task('copy-external', () => {
    gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
    gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', () => {
    gulp.watch('src/js/*.js',
        ['browserify', 'js-tests']);
    gulp.watch('src/tests/*.js',
        ['js-tests']);
    gulp.watch('src/styles/**/*.scss',
        ['compile-scss']);
    gulp.watch('src/js/config.json',
        ['browserify']);
});

gulp.task('checkDev', [], callback => {
    const options = {
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

// Default Task
const devtasks = ['git-rev', 'js-tests', 'browserify', 'compile-scss', 'copy-external', 'watch'];
const prodtasks = ['git-rev', 'js-tests', 'browserify', 'compile-scss-production', 'copy-external', 'preprocess-html'];
if (production) {
    gulp.task('default', prodtasks);
} else {
    gulp.task('default', devtasks);
}
