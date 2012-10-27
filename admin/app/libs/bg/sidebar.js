var sidebar = {};



LOAD( MODEL_DIR, function( file ){
  var raw  = file.replace( '.js', '' );
  var name = raw.underscore();
  var url  = '/' + name + '/index';

  sidebar[ raw ] = {
    title : 'Go to ' + url,
    href  : url,
    klass : ''
  };
}, function(){
  SECRET.set( 'sidebar', {
    module_user  : null,
    module_place : null,
    raw          : sidebar
  });
  LOG.debug( null, '[bg_jobs][prepare] Sidebar raw table list builded', sidebar );
});
