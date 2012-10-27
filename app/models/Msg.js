var Msg = require( BASE_DIR + '/db/schema' ).Msg;



Msg.statics = {

    send : function( req, res, type, connection ){
      var params = req.params;
      var msg = {
        sender_id     : params.sender_id,
        sender_name   : params.sender_name,
        receiver_id   : params.receiver_id || params.channel_id,
        receiver_type : type,
        content       : params.content,
        created_at    : Date.now()
      };

      HOOK.emit( connection, connection, msg );
      res( 200, { msg : msg });

      new this( msg ).save( function( e, msg ){
        if( e ){
          return LOG.error( 500, req, 'Having trouble with saving a msg' );
        }

        LOG.debug( req, 'Msg saved', msg );
      });
    },

    receive : function( res, receiver_id, receiver_type, timestamp ){
      this.find({
        receiver_id   : receiver_id,
        receiver_type : receiver_type,
        created_at    : { $lte : parseInt( timestamp, 10 )}
      }).sort( 'created_at', -1 ).limit( 20 ).run( function( e, msgs ){
        if( e ){
          return res( 500, 'Having trouble with finding msgs' );
        }

        res( 200, { msgs : msgs });
      });
    },

    watch : function( req, res, connection ){
      // watch changes
      HOOK.once( connection, function( connection, msg ){
        LOG.debug( req, 'Msg received form : ' + connection, msg );

        res( 200, { msg : msg });
      });
    }
};



require( 'mongoose' ).model( 'Msg', Msg );
