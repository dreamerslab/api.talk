// load libs
HOOK.once( 'SYS.models-loaded', function(){
  LIBS.forEach( function( file ){
    var name = file.replace( '.js', '' );

    require( LIB_DIR + name );
    LOG.sys( 'Loading lib: ' + name );
  });

  HOOK.emit( 'SYS.libs-loaded' );
  LOG.sys( 'All libs loaded' );
});