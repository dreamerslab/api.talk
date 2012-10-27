var mongoose    = require( 'mongoose' );
var ChannelUser = mongoose.model( 'ChannelUser' );
var _super      = require( './application' );



module.exports = {

  index : function( req, res, next ){
    _super.index( req, res, ChannelUser, 'channel_user' );
  },

  create : function( req, res, next ){
    _super.create( req, res, ChannelUser );
  },

  destroy : function( req, res, next ){
    _super.destroy( req, res, ChannelUser, 'channel_user' );
  },

  drop : function( req, res, next ){
    _super.drop( req, res, ChannelUser );
  },

  update : function( req, res, next ){
    _super.update( req, res, ChannelUser, 'channel_user' );
  }
};
