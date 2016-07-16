var gulp = require('gulp');
var elixir = require('laravel-elixir');
var flatten = require('gulp-flatten');
var del = require('del');
var ts = require('gulp-typescript');
var Builder = require('systemjs-builder');

var paths = {
    nodeModules: 'node_modules',
    css: 'public/assets/css',
    js: 'public/assets/js',
    vendor: 'public/assets/vendor'
};

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', [], function() {
    return del([paths.css, paths.js, paths.vendor]);
});

gulp.task('build:ts', function() {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(gulp.dest(paths.js));
});

gulp.task('bundle:js', function() {
    var builder = new Builder('public', 'resources/assets/config/system.config.js');
    
    return builder
        .bundle('public/assets/js/**/*.js', 'public/assets/js/app-manager.js');        
});

gulp.task('copy:angular', function() {
    return gulp.src('node_modules/@angular/*/bundles/*.min.js', { base: 'node_modules' })
        .pipe(gulp.dest(paths.vendor));
});

gulp.task('copy:rxjs', function() {
    return gulp.src('node_modules/rxjs/**/*.js', { base: 'node_modules' })
        .pipe(gulp.dest(paths.vendor));
});

elixir(function(mix) {
    mix.task('clean');
    
    // SASS
    mix.sass('app-manager.scss', paths.css);
    
    mix.task('build:ts');
    //mix.task('bundle:js');
    
    // config
    mix.copy('resources/assets/config/system.config.js', paths.js);
    
    // dependencies
    mix.copy('node_modules/bootstrap/dist/css/bootstrap.min.css', paths.vendor + '/bootstrap')
        .copy('node_modules/font-awesome/css/font-awesome.min.css', paths.vendor + '/font-awesome/css')
        .copy('node_modules/font-awesome/fonts', paths.vendor + '/font-awesome/fonts')
        .copy('node_modules/core-js/client/shim.min.js', paths.vendor + '/core-js')
        .copy('node_modules/zone.js/dist/zone.min.js', paths.vendor + '/zone.js/zone.min.js')
        .copy('node_modules/reflect-metadata/Reflect.js', paths.vendor + '/reflect-metadata')        
        .copy('node_modules/systemjs/dist/system.js', paths.vendor + '/systemjs');

    mix.task('copy:angular');
    
    mix.task('copy:rxjs');
});