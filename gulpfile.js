/*eslint-env node*/
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var fs = require('fs');
var bump = require('gulp-bump');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var data = require('gulp-data');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var p = require('path');
var ghPages = require('gulp-gh-pages');
var file = require('gulp-file');
var aureliaBundle = require('aurelia-cli').bundle;
var Vulcanize = require('vulcanize');
// var htmlmin = require('gulp-htmlmin');
// var vulcanize = require('gulp-vulcanize');
// var jspm = require('jspm');

var path = {
    src: 'src/',
    scripts: 'src/**/*.js',
    html: ['src/index.jade', 'src/polymer-elements.jade', 'src/app/**/*.jade'],
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

gulp.task('clean', function() {
    return gulp.src([path.output])
        .pipe(vinylPaths(del));
});

gulp.task('clean-dist', function() {
    return gulp.src([
        path.custElementsStyleCompiled,
        path.out + '**/*.map',
        path.out + 'app/*',
        path.out + 'app/'
    ]).pipe(vinylPaths(del));
});

gulp.task('build-style', function() {
    return gulp.src([path.src + 'styles/app.styl'])
        // .pipe(sourcemaps.init())
        .pipe(stylus({use: [nib()], import: 'nib', compress: inProd()}))
        .pipe(rename('style.css'))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.output));
});

gulp.task('build-elements-style', function() {
    return gulp.src([path.custElementsStyle], {base: path.src})
        .pipe(changed(path.output, {extension: '.styl'}))
        // .pipe(sourcemaps.init())
        .pipe(stylus({use: [nib()], import: 'nib', compress: inProd()}))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.elementsStyleOut));
});

gulp.task('build-html', function() {
    //var lang = 'es'; // TODO: be able to specify language on build

    return gulp.src(path.html, {base: path.src})
        .pipe(changed(path.output, {extension: '.html'}))
//        .pipe(data(stringsFile))
        .pipe(jade({pretty: false}))
        .pipe(gulp.dest(path.output));

//    function stringsFile(file) {
//        var filePath = './strings/' + lang + '/' + p.basename(file.path, '.jade') + '.' + lang + '.json';
//        return fs.existsSync(filePath) ? require(filePath): {};
//    }
});

gulp.task('lint', function() {
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
        ['build-elements-style', 'build-style', 'build-html'],
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
    gulp.watch(path.scripts, browserSync.reload).on('change', reportChange);
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

gulp.task('vulcanize', function(done) {
    var vulcan = new Vulcanize({
        abspath: '',
        inlineScripts: true,
        inlineCss: true,
        stripComments: true
    });
    vulcan.process('dist/polymer-elements.html', function(err, html) {
        if (err) { throw err; }
        require('fs').writeFileSync('dist/polymer-elements.html', html);
        done();
    });
});

gulp.task('min-elements', function() {
    return gulp.src('dist/polymer-elements.html')
        .pipe(htmlmin({collapseWhitespace: true, minifyJs: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('bundle', function(done) {
    aureliaBundle({
        js: {
            'dist/bundle': {
                modules: [
                    'yi/**/*',
                    'aurelia-bootstrapper',
                    'github:aurelia/history-browser@0.6.2',
                    'github:aurelia/loader-default@0.9.1',
                    'github:aurelia/templating-binding@0.13.2',
                    'github:aurelia/templating-resources@0.13.3',
                    'github:aurelia/templating-router@0.14.1'
                ],
                options: { inject: false, sourcemaps: false, minify: true }
            }
        },
        template: {
            'dist/bundle': {
                pattern: 'app/**/*.html',
                options: { inject: false }
            }
        }
    }, {
        force: true,
        baseURL: 'dist'
    }).then(function() {
        console.log('bundle finished!');
        done();
    });
});

gulp.task('dist', function(done) {
    path.output = 'dist/';
    path.elementsStyleOut = path.src;
    // manually set NODE_ENV to 'production' // is it the best way?
    process.env.NODE_ENV = 'production';
    return runSequence(
        'clean',
        ['build-elements-style', 'build-style', 'build-html'],
        'vulcanize',
        'bundle',
        ['copy-lib', 'copy-assets'],
        'clean-dist', // NOTE can't call imediately until areliaBundle returns a promise
        done
    );
});

gulp.task('deploy-preprod', function() {
    var origin = 'me';
    return gulp.src('dist/**/*')
        .pipe(ghPages({origin: origin, force: true}));
});

gulp.task('deploy', function() {
    return gulp.src('dist/**/*')
        .pipe(file('CNAME', 'app.yointervengo.co'))
        .pipe(ghPages());
});
