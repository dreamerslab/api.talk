var mongoose = require( 'mongoose' );



HOOK.once( 'SYS.express-configured', function( app ){
  LOAD( MODEL_DIR, function( file ){
    require( MODEL_DIR + file );
    LOG.sys( 'Loading model: ' + file.replace( '.js', '' ) );

  }, function(){
    mongoose.connect( DB_URL );
    LOG.sys( 'All models loaded' );
    LOG.sys( 'Database connected at ' + DB_URL );

    HOOK.emit( 'SYS.models-loaded', app );
  });
});
