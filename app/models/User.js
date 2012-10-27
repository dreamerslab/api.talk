var User = require( BASE_DIR + '/db/schema' ).User;



User.statics = {

  create : function( req, res, ChannelUser, Channel, Login ){
    var self = this;

    new this({
      name : req.params.name
    }).save( function( e, user ){
      if( e ){
        return res( 500, 'Having trouble with creating a new user' );
      }

      req.params.user_id = user._id;

      self.action( req, res, ChannelUser, Channel, Login,
        function(){
          res( 200,{ user : user });
        });
    });
  },

  action : function( req, res, ChannelUser, Channel, Login, next ){
    // add user to this channel
    if( req.action === 'user/join' ){
      ChannelUser.create( req, res, next );
    }else{
      ChannelUser.kill( req, res );
    }

    // update user count for this channel
    Channel.update_users( req, res );
    // save login history
    Login.create( req, res );
  }
};



require( 'mongoose' ).model( 'User', User );
