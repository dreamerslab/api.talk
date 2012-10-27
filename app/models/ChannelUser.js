var ChannelUser = require( BASE_DIR + '/db/schema' ).ChannelUser;



ChannelUser.statics = {

  create : function( req, res, next ){
    var params  = req.params;
    var user_id = params.user_id;

    new this({
      channel_id : params.channel_id,
      user_id    : user_id,
      user_name  : params.name
    }).save( function( e, channel_user ){
      if( e ){
        return res( 500, 'Having trouble with creating a new channel user record' );
      }

      LOG.debug( req, 'Create new channel user record', channel_user );
      next();
    });
  },

  kill : function( req, res ){
    this.remove({
      user_id : req.params.user_id
    }, function( e, count ){
      if( e ){
        return res( 500, 'Having trouble with removing channel users' );
      }

      LOG.debug( req, 'Channel users removed', count );
    });
  }
};



require( 'mongoose' ).model( 'ChannelUser', ChannelUser );
