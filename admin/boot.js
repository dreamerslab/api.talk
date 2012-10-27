global.BASE_DIR = __dirname;

global.PROJECT_DIR = BASE_DIR.replace( /[\\|\/]admin/, '' );
// set global variables
require( BASE_DIR + '/core/global' );
// set ENV
require( CONF_DIR + 'env' );
// load configs
require( CONF_DIR + ENV );
// load logger
require( CORE_DIR + '/logger' );

// load core modules
CORE.forEach( function( name ){
  require( CORE_DIR + name );
  LOG.sys( 'loading core module: ' + name );
});

HOOK.emit( 'SYS.core-modules-loaded' );
LOG.sys( 'All core modules loaded' );