var Channel = require( BASE_DIR + '/db/schema' ).Channel;



Channel.statics = {

  create : function( res, title, url, host, protocol ){
    new this({
      name     : title,
      url      : url,
      protocol : protocol,
      root     : host
    }).save( function( e, channel ){
      if( e ){
        return res( 500, 'Having trouble with creating a new channel record' );
      }

      res( 200,{ channel : channel });
    });
  },

  index : function( sort, res ){
    this.find().sort( sort, -1 ).limit( 10 ).run( function( e, channels ){
      if( e ){
        return res( 500, 'Having trouble with finding channels' );
      }

      res( 200,{ channels : channels });
    });
  },

  update_users : function( req, res ){
    var params     = req.params;
    var channel_id = params.channel_id;

    this.findById( channel_id, function( e, channel ){
      var action_msg;

      if( e ){
        return res( 500, 'Having trouble with finding a channel' );
      }

      if( channel ){
        if( req.action === 'user/join' ){
          channel.user_count = channel.user_count + 1;
          action_msg         = 'joined the chat room. We have ' + channel.user_count + ' people now!';
        }else{
          channel.user_count = channel.user_count - 1;
          action_msg         = 'left the chat room. We have ' + channel.user_count + ' people.';
        }

        channel.save( function( e, channel ){
          if( e ){
            return res( 500, 'Having trouble with updating a channel' );
          }

          var connection = 'APP.connection-to-channel-' + channel_id;
          var timer      = SECRET.get( 'APP.watch-msg-timer', timer );

          // trigger [msg][watch_channel] action
          HOOK.emit( connection, connection, {
            sender_id     : params.user_id,
            sender_name   : params.name,
            receiver_id   : channel_id,
            receiver_type : 'channel',
            content       : action_msg,
            created_at    : Date.now()
          });
        });
      }
    });
  }
};



require( 'mongoose' ).model( 'Channel', Channel );
