var mongoose    = require( 'mongoose' );
var User        = mongoose.model( 'User' );
var Login       = mongoose.model( 'Login' );
var Channel     = mongoose.model( 'Channel' );
var ChannelUser = mongoose.model( 'ChannelUser' );



HOOK.on( 'SYS.disconnect', function( socket ){
  var connection_id = socket.id;

  Login.findOne({
    connection_id : connection_id
  }, function( e, history ){
    var req, res;

    if( e ){
      return LOG.error( 500, req, 'Having trouble with finding a login record' );
    }

    if( history ){
      req = {
        connection_id : connection_id,
        action_id : 0,
        action : 'user/leave',
        params : {
          user_id       : history.user_id,
          name          : history.user_name,
          channel_id    : history.channel_id,
          connection_id : history.connection_id
        }
      };

      res = function( status, data, custom_action ){
        LOG.response( req, status, Date.now(), data );
      };

      User.action( req, res, ChannelUser, Channel, Login,
        function( user_id ){
          res( 200 );
        });
    }
  });
});
