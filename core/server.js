HOOK.once( 'SYS.controllers-loaded', function( controllers ){
  var io = require( 'socket.io' ).listen( PORT, HOST );

  io.configure( function(){
    io.set( 'log level', 0 );
  });

  io.sockets.on( 'connection', function( socket ){
    var action;

    for( action in controllers ){
      HOOK.emit( 'SYS.dispatch', socket, action, controllers[ action ]);
    }
    LOG.connection( socket );

    socket.on( 'disconnect', function(){
      HOOK.emit( 'SYS.disconnect', socket );
    });
  });
  LOG.sys( 'Server running at http://' + HOST + ':' + PORT + '/' );

  process.on( 'uncaughtException', function( e ){
    LOG.error( 500, {
      connection_id : 0,
      action_id : 0,
      action : 'Error caught from global'
    }, e );
  });

});