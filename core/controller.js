var controllers = [];



HOOK.once( 'SYS.models-loaded', function(){
  LOAD( CONTROLLER_DIR, function( file ){
    var name, controller, action, handler_name;

    name       = file.replace( '.js', '' );
    controller = require( CONTROLLER_DIR + name );

    for( action in controller ){
      handler_name = name + '/' + action;
      controllers[ handler_name ] = controller[ action ];

      LOG.sys( 'Building handler: ' + handler_name );
    }
  }, function(){
    LOG.sys( 'All controllers loaded' );

    HOOK.emit( 'SYS.controllers-loaded' , controllers );
  });
});

