var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var to5 = require('gulp-6to5');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require("gulp-yuidoc");
var changelog = require('conventional-changelog');
var assign = Object.assign || require('object.assign');
var fs = require('fs');
var bump = require('gulp-bump');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var tools = require('aurelia-tools');
var data = require('gulp-data');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var p = require('path');

var path = {
    src: 'src/',
    scripts: 'src/app/**/*.js',
    html: 'src/**/*.jade',
    style: 'src/styles/**/*.styl',
    custElementsStyle: 'src/app/elements/**/*.styl',
    output: '.tmp/',
    out: 'dist/',
    doc: './doc'
};

var compilerOptions = {
    filename: '',
    filenameRelative: '',
    blacklist: [],
    whitelist: [],
    modules: '',
    sourceMap: true,
    sourceMapName: '',
    sourceFileName: '',
    sourceRoot: '',
    moduleRoot: '',
    moduleIds: false,
    runtime: false,
    experimental: false,
    format: {
        comments: false,
        compact: false,
        indent: {
            parentheses: true,
            adjustMultilineComment: true,
            style: "  ",
            base: 0
        }
    }
};

var jshintConfig = {esnext: true};

gulp.task('clean', function () {
    return gulp.src([path.output])
        .pipe(vinylPaths(del));
});

gulp.task('build-system', function () {
    return gulp.src(path.scripts, {base: path.src})
        .pipe(plumber())
        .pipe(changed(path.output, {extension: '.js'}))
        .pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
        .pipe(gulp.dest(path.output));
});

gulp.task('build-style', function () {
    return gulp.src([path.src + 'styles/app.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus({use: [nib()], import: 'nib'}))
        .pipe(rename('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.output));
});

gulp.task('build-elements-style', function () {
    return gulp.src([path.custElementsStyle], {base: path.src})
        .pipe(changed(path.output, {extension: '.styl'}))
        .pipe(sourcemaps.init())
        .pipe(stylus({use: [nib()], import: 'nib'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.output));
});

gulp.task('build-html', function () {
    //var lang = 'es'; // TODO: be able to specify language on build

    return gulp.src(path.html)
        .pipe(changed(path.output, {extension: '.html'}))
        //.pipe(data(stringsFile))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(path.output));

    //function stringsFile(file) {
    //    var filePath = './strings/' + lang + '/' + p.basename(file.path, '.jade') + '.' + lang + '.json';
    //    return fs.existsSync(filePath) ? require(filePath): {};
    //}
});

gulp.task('lint', function () {
    return gulp.src(path.scripts)
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish));
});

gulp.task('doc-generate', function () {
    return gulp.src(path.scripts)
        .pipe(yuidoc.parser(null, 'api.json'))
        .pipe(gulp.dest(path.doc));
});

gulp.task('doc', ['doc-generate'], function () {
    tools.transformAPIModel(path.doc);
});

gulp.task('bump-version', function () {
    return gulp.src(['./package.json'])
        .pipe(bump({type: 'patch'})) //major|minor|patch|prerelease
        .pipe(gulp.dest('./'));
});

gulp.task('changelog', function (callback) {
    var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

    return changelog({
        repository: pkg.repository.url,
        version: pkg.version,
        file: path.doc + '/CHANGELOG.md'
    }, function (err, log) {
        fs.writeFileSync(path.doc + '/CHANGELOG.md', log);
    });
});

gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-elements-style', 'build-style', 'build-html'],
        callback
    );
});

gulp.task('update-own-deps', function () {
    tools.updateOwnDependenciesFromLocalRepositories();
});

gulp.task('serve', ['build'], function (done) {
    browserSync({
        open: false,
        port: 9000,
        server: {
            baseDir: [path.output, path.src],
            routes: {
                '/vendor': 'vendor'
            },
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});

function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function () {
    gulp.watch(path.scripts, ['build-system', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.html, ['build-html', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.style, ['build-style', browserSync.reload]).on('change', reportChange);
    gulp.watch(path.custElementsStyle, ['build-elements-style', browserSync.reload]).on('change', reportChange);
});

gulp.task('prepare-release', function (callback) {
    return runSequence(
        'build',
        'lint',
        'bump-version',
        'doc',
        'changelog',
        callback
    );
});