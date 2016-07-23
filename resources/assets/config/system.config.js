(function(global) {    
  // map tells the System loader where to look for things
  var map = {
    'app-manager':                'app-manager',
    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',
    'moment':                     'node_modules/moment/moment.js',
    'ng2-bootstrap':              'node_modules/ng2-bootstrap'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app-manager':                { main: 'core/bootstrap.js',  defaultExtension: 'js' },
    '@angular':                   { defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'ng2-bootstrap':              { defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade'
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  var setPackageConfig = packIndex;
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);