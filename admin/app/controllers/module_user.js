var _super   = require( './application' );
var mongoose = require( 'mongoose' );
var User     = mongoose.model( 'User' );
var Msg      = mongoose.model( 'Msg' );
var Models   = {
  ChannelUser : mongoose.model( 'ChannelUser' ),
  Login       : mongoose.model( 'Login' )
};



module.exports = {

  index : function( req, res, next ){
    _super.module_index( req, res, User, 'module_user' );
  },

  create : function( req, res, next ){
    _super.create( req, res, User );
  },

  destroy : function( req, res, next ){
    _super.destroy( req, res, User, 'user', function( user_id ){
      var name;

      for( name in Models ){
        Models[ name ].remove({
          user_id : user_id
        }, function( name ){
          return function( e, count ){
            if( e ){
              return res.error( 500, res, e );
            }

            LOG.debug( res._id, '[module_user/destroy][' + name + '] ' + count + ' records removed.'  );
          };
        }( name ));
      }

      Msg.remove({
        $or : [{
          sender_id : user_id
        }, {
          receiver_id : user_id
        }]
      }, function( e, count ){
        if( e ){
          return res.error( 500, res, e );
        }

        LOG.debug( res._id, '[module_user/destroy][Msg] ' + count + ' records removed.'  );
      });
    });
  },

  drop : function( req, res, next ){
    _super.drop( req, res, User );
  },

  update : function( req, res, next ){
    _super.update( req, res, User, 'user' );
  }
};
