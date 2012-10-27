var mongoose = require( 'mongoose' );
var Channel  = mongoose.model( 'Channel' );
var seed     = require( BASE_DIR + '/db/seed' );



var _ = {

  init : function(){
    this.build_default_channels();
  },

  build_default_channels : function(){
    var default_channels = seed.default_channels;
    var i                = default_channels.length;

    for( ;i--; ){
      Channel.findOne({
        name : default_channels[ i ].name
      }, function( i ){
        return function( e, channel ){
          if( e ){
            res( 500, 'Having trouble with finding a channel' );
            return;
          }

          if( channel === null ){
            new Channel( default_channels[ i ]).save();
          }
        };
      }( i ));
    }
  }

};



_.init();
