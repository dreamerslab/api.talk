global.BASE_DIR = __dirname;
// set ENV
require( BASE_DIR + '/configs/env' );
// set global variables
require( BASE_DIR + '/core/global' );
// load configs
require( BASE_DIR + '/configs/' + ENV );
// load logger
require( CORE_DIR + '/logger' );

// load core modules
CORE.forEach( function( name ){
  require( CORE_DIR + name );
  LOG.sys( 'loading core module: ' + name );
});

HOOK.emit( 'SYS.core-modules-loaded' );
LOG.sys( 'All core modules loaded' );
