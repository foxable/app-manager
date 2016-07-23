var gulp = require('gulp');
var elixir = require('laravel-elixir');
var flatten = require('gulp-flatten');
var del = require('del');
var inlineNg2Template = require('gulp-inline-ng2-template');
var ts = require('gulp-typescript');
var Builder = require('systemjs-builder');

var paths = {
    nodeModules: 'node_modules',
    css: 'public/assets/css',
    js: 'public/assets/js',
    vendor: 'public/assets/vendor',
    tmp: '.tmp'
};

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', [], function() {
    return del([paths.tmp, paths.css, paths.js, paths.vendor]);
});

gulp.task('build:ts', function() {
    var tsResult = tsProject.src()
        .pipe(inlineNg2Template({ useRelativePaths: true, removeLineBreaks: true, indent: 0 }))
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(gulp.dest(paths.tmp + '/js/app-manager'));
});

gulp.task('bundle:app-manager', function() {
    var builder = new Builder('.tmp/js', 'resources/assets/config/system.config.js');
    
    var exclude = ['@angular/*', 'rxjs/*', 'ng2-bootstrap/*', 'moment']; 
    var meta = {};
    exclude.forEach(function(dependency) { meta[dependency] = { build: false }; });
    
    builder.config({
        meta: meta
    });

    return builder
        .bundle('app-manager/**', paths.js + '/app-manager.bundle.js', { minify: true });        
});

gulp.task('bundle:dependencies', function() {
    var builder = new Builder('', 'resources/assets/config/system.config.js');
    
    builder.config({
        map: {
            'app-manager': '.tmp/js/app-manager'
        },
        packages: {
            'app-manager': { main: 'core/boostrap.js', defaultExtension: 'js' }
        }
    });

    return builder
        .bundle('app-manager/** - [app-manager/**]', paths.js + '/dependencies.bundle.js', { minify: true });     
});

elixir(function(mix) {
    mix.task('clean');
    
    // SASS
    mix.sass('app-manager.scss', paths.css);
    
    mix.task('build:ts');
    mix.task('bundle:app-manager');
    mix.task('bundle:dependencies');
    
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
});