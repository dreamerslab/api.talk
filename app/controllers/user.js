var mongoose    = require( 'mongoose' );
var User        = mongoose.model( 'User' );
var Login       = mongoose.model( 'Login' );
var Channel     = mongoose.model( 'Channel' );
var ChannelUser = mongoose.model( 'ChannelUser' );
var _super      = require( './application' );



module.exports = {

  join : function( req, res ){
    _super.check_params( 'params.name && params.channel_id',
      req, res, function( params ){
        // in the future we should use cookie to find user by id first
        // if not find create a new user
        User.create( req, res, ChannelUser, Channel, Login );
      });
  }
};
