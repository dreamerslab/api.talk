var ID = 0;



HOOK.on( 'SYS.dispatch', function( socket, action, handler ){
  // request
  socket.on( 'req/' + action, function( connection_id ){
    return function( data ){
      var req;

      ID++;

      req = {
        connection_id : connection_id,
        action_id : ID,
        action : action,
        params : data
      };

      LOG.request( req );
      /* handler( req, res ); */
      handler( req, function( connection_id, action, action_id, start ){
        return function( status, data, custom_action ){
          var _action = custom_action ? custom_action : action;

          socket.emit( 'res/' + _action, {
            status : status,
            body : data
          });
          LOG.response( req, status, start, data );
        };
      }( connection_id, action, ID, Date.now()));
    };
  }( socket.id ));
  LOG.sys( 'Dispatching handler: ' + action );
});