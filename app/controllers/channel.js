var mongoose    = require( 'mongoose' );
var Channel     = mongoose.model( 'Channel' );
var ChannelUser = mongoose.model( 'ChannelUser' );
var url         = require( LIB_DIR + 'url' );
var _super      = require( './application' );



module.exports = {

  info : function( req, res ){
    _super.check_params( 'params.id',
      req, res, function( params ){

        Channel.findById( params.id, function( e, channel ){
          if( e ){
            return res( 500, 'Having trouble with finding a channel' );
          }

          if( channel ){
            return res( 200,{ channel : channel });
          }

          res( 45, 'Channel not found' );
        });
      });
  },

  latest : function( req, res ){
    Channel.index( 'created_at', res );
  },

  hottest : function( req, res ){
    Channel.index( 'user_count', res );
  },

  related : function( req, res ){
    _super.check_params( 'params.root',
      req, res, function( params ){

        Channel.find({
          root : params.root
        }, function( e, channels ){
          if( e ){
            return res( 500, 'Having trouble with finding channels' );
          }

          res( 200,{ channels : channels });
        });
      });
  },

  users : function( req, res ){
    _super.check_params( 'params.channel_id',
      req, res, function( params ){

        ChannelUser.find({
          channel_id : params.channel_id
        }, function( e, users ){
          if( e ){
            return res( 500, 'Having trouble with finding channel users' );
          }

          res( 200,{ users : users });
        });
      });
  },

  create : function( req, res ){
    _super.check_params( 'params.url',
      req, res, function( params ){

        url.get( params.url, res, function( title, url ){
          var protocol = url.protocol || 'http://';
          // remove trailing slash
          var _url     = ( url.host + url.relative || '' ).replace( /\/$/, '' );

          Channel.findOne({
            url : _url
          }, function( e, channel ){
            if( e ){
              return res( 500, 'Having trouble with finding a channel' );
            }

            if( channel ){
              return res( 200,{ channel : channel });
            }

            Channel.create( res, title, _url, url.host, protocol );
          });
        });
      });
  }
};
