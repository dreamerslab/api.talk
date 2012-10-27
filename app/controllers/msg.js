var mongoose = require( 'mongoose' );
var Msg      = mongoose.model( 'Msg' );
var _super   = require( './application' );



module.exports = {

  receive : function( req, res ){
    _super.check_params( 'params.receiver_id && params.timestamp',
      req, res, function( params ){
        Msg.receive( res, params.receiver_id,
          'user', params.timestamp );
      });
  },

  watch : function( req, res ){
    _super.check_params( 'params.receiver_id',
      req, res, function( params ){
        Msg.watch( req, res, 'APP.connection-to-user-' + params.receiver_id );
      });
  },

  receive_from_channel : function( req, res ){
    _super.check_params( 'params.channel_id && params.timestamp',
      req, res, function( params ){
        Msg.receive( res, params.channel_id,
          'channel', params.timestamp );
      });
  },

  watch_channel : function( req, res ){
    _super.check_params( 'params.channel_id',
      req, res, function( params ){
        Msg.watch( req, res, 'APP.connection-to-channel-' + params.channel_id );
      });
  },

  send : function( req, res ){
    _super.check_params(
      'params.sender_id && params.sender_name && params.receiver_id && params.content',
      req, res, function( params ){
        Msg.send( req, res, 'user',
          'APP.connection-to-user-' + params.receiver_id);
      });
  },

  send_to_channel : function( req, res ){
    _super.check_params(
      'params.sender_id && params.sender_name && params.channel_id && params.content',
      req, res, function( params ){
        Msg.send( req, res, 'channel',
          'APP.connection-to-channel-' + params.channel_id );
      });
  }
};
