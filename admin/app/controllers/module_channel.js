var _super      = require( './application' );
var mongoose    = require( 'mongoose' );
var Channel     = mongoose.model( 'Channel' );
var ChannelUser = mongoose.model( 'ChannelUser' );
var Msg         = mongoose.model( 'Msg' );



module.exports = {

  index : function( req, res, next ){
    _super.module_index( req, res, Channel, 'module_channel' );
  },

  create : function( req, res, next ){
    _super.create( req, res, Channel );
  },

  destroy : function( req, res, next ){
    _super.destroy( req, res, Channel, 'channel', function( channel_id ){
      ChannelUser.remove({
        channel_id : channel_id
      }, function( e, count ){
        if( e ){
          return res.error( 500, res, e );
        }

        LOG.debug( res._id, '[module_channel/destroy] ' + count + ' records removed.'  );
      });

      Msg.remove({
        $or : [{
          sender_id : channel_id
        }, {
          receiver_id : channel_id
        }]
      }, function( e, count ){
        if( e ){
          return res.error( 500, res, e );
        }

        LOG.debug( res._id, '[module_channel/destroy][Msg] ' + count + ' records removed.'  );
      });
    });
  },

  drop : function( req, res, next ){
    _super.drop( req, res, Channel );
  },

  update : function( req, res, next ){
    _super.update( req, res, Channel, 'channel' );
  }
};
