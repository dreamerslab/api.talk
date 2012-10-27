var fs = require( 'fs' );

// when loading files make sure not to load .DS_Store
global.LOAD = function( dir, each, finish ){
  fs.readdir( dir, function( e, files ){
    if( e ) throw e;

    files.forEach( function( file ){
      each( file );
    });

    finish && finish();
  });
};