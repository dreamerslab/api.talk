var path = __dirname + '/bg/';

require( 'fs' ).readdirSync( path ).forEach( function ( file ){
  if( UTIL.regex.js_file.test( file )){
    require( path + file );
  }
});