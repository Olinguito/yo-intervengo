/*eslint-env node*/
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var to5 = require('gulp-babel');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var fs = require('fs');
var bump = require('gulp-bump');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var data = require('gulp-data');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var p = require('path');
var vulcanize = require('gulp-vulcanize');
var ghPages = require('gulp-gh-pages');
var jspm = require('jspm');

var path = {
    src: 'src/',
    scripts: 'src/app/**/*.js',
    html: 'src/**/*.jade',
    style: 'src/styles/**/*.styl',
    custElementsStyle: 'src/app/elements/**/*.styl',
    custElementsStyleCompiled: 'src/app/elements/**/*.{css,css.map}',
    output: '.tmp/',
    out: 'dist/'
};
path.elementsStyleOut = path.output;

var inProd = function() {
    return process.env.NODE_ENV === 'production' ? true : false;
};

var compilerOptions = {
    modules: 'system',
    moduleIds: false,
    comments: false,
    compact: false,
    stage: 2,
    optional: [
        'es7.decorators',
        'es7.classProperties'
    ]
};

var jshintConfig = {esnext: true};

gulp.task('clean', function() {
    return gulp.src([path.output])
        .pipe(vinylPaths(del));
});

gulp.task('clean-dist', function() {
    return gulp.src([path.custElementsStyleCompiled, path.output + '**/*.map'])
        .pipe(vinylPaths(del));
});

gulp.task('build-system', function() {
    return gulp.src(path.scripts, {base: path.src})
        .pipe(plumber())
        .pipe(changed(path.output, {extension: '.js'}))
//        .pipe(sourcemaps.init())
        .pipe(to5(compilerOptions))
//        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/' + path.output }))
        .pipe(gulp.dest(path.output));
});

gulp.task('build-style', function() {
    return gulp.src([path.src + 'styles/app.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus({use: [nib()], import: 'nib', compress: inProd()}))
        .pipe(rename('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.output));
});

gulp.task('build-elements-style', function() {
    return gulp.src([path.custElementsStyle], {base: path.src})
        .pipe(changed(path.output, {extension: '.styl'}))
        .pipe(sourcemaps.init())
        .pipe(stylus({use: [nib()], import: 'nib', compress: inProd()}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.elementsStyleOut));
});

gulp.task('build-html', function() {
    //var lang = 'es'; // TODO: be able to specify language on build

    return gulp.src(path.html)
        .pipe(changed(path.output, {extension: '.html'}))
//        .pipe(data(stringsFile))
        .pipe(jade({pretty: !inProd()}))
        .pipe(gulp.dest(path.output));

//    function stringsFile(file) {
//        var filePath = './strings/' + lang + '/' + p.basename(file.path, '.jade') + '.' + lang + '.json';
//        return fs.existsSync(filePath) ? require(filePath): {};
//    }
});

gulp.task('lint', function() {
    return gulp.src(path.scripts)
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish));
});

gulp.task('bump-version', function() {
    return gulp.src(['./package.json'])
        .pipe(bump({type: 'patch'})) //major|minor|patch|prerelease
        .pipe(gulp.dest('./'));
});

gulp.task('build', function(callback) {
    process.env.NODE_ENV = 'development';
    return runSequence(
        'clean',
        ['build-system', 'build-elements-style', 'build-style', 'build-html'],
        callback
    );
});

gulp.task('serve', ['build'], function(done) {
    browserSync({
        open: false,
        port: 9000,
        server: {
            baseDir: [path.output, path.src],
            routes: {
                '/vendor': 'vendor'
            },
            middleware: function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});

function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
    gulp.watch(path.scripts, ['build-system', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.html, ['build-html', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.style, ['build-style', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.custElementsStyle, ['build-elements-style', browserSync.reload]).on('change', reportChange);
});

// bundling/dist/deploy stuff

gulp.task('copy-lib', function() {
    return gulp.src('vendor/{system,es6-module-loader}.js', { base: '.'})
        .pipe(gulp.dest(path.out));
});

gulp.task('copy-assets', function() {
    return gulp.src([path.src + '**/*.{png,jpg,svg,json}', path.src + 'config.js'])
        .pipe(gulp.dest(path.out));
});

gulp.task('vulcanize', function() {
    return gulp.src(path.output + 'polymer-elements.html')
        .pipe(vulcanize({
            dest: path.output,
            inline: true,
            abspath: '.',
            strip: true
        }))
        .pipe(gulp.dest(path.output));
});

gulp.task('jspm-bundle', function(done) {
    var dependencies = [
        'yi/**/*',
        'lib/**/*',
        // ninja dependencies
        'aurelia-bootstrapper',
        'aurelia-loader-default',
        'core-js',
        'aurelia-templating-binding',
        'aurelia-templating-resources',
        'aurelia-history-browser',
        'aurelia-templating-router'
    ];
    // TODO: create jspm plugin
    jspm.setPackagePath('.');
    jspm.bundle(
        dependencies.join(' + '),
        path.out + 'build.js',
        {
            minify: true,
            sourceMaps: false
        }
    ).then(done);
});

gulp.task('dist', function(done) {
    path.output = 'dist/';
    path.elementsStyleOut = path.src;
    // manually set NODE_ENV to 'production' // is it the best way?
    process.env.NODE_ENV = 'production';
    return runSequence(
        'clean',
        ['build-elements-style', 'build-style', 'build-html', 'copy-lib', 'copy-assets'],
        ['vulcanize', 'jspm-bundle'],
        'clean-dist',
        done
    );
});

gulp.task('deploy-preprod', ['dist'], function() {
    var origin = 'me';
    return gulp.src('dist/**/*')
        .pipe(ghPages({origin: origin, force: true}));
});
