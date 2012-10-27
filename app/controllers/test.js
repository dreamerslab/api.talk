var mongoose = require( 'mongoose' );
var Channel  = mongoose.model( 'Channel' );
var _super   = require( './application' );



module.exports = {

  index : function( req, res ){
    res( 200, {
      req : req
    });
  }
};
