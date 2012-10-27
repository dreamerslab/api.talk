var mongoose = require( 'mongoose' );
var Channel  = mongoose.model( 'Channel' );
var _super   = require( './application' );



module.exports = {

  index : function( req, res, next ){
    _super.index( req, res, Channel, 'channel' );
  },

  create : function( req, res, next ){
    _super.create( req, res, Channel );
  },

  destroy : function( req, res, next ){
    _super.destroy( req, res, Channel, 'channel' );
  },

  drop : function( req, res, next ){
    _super.drop( req, res, Channel );
  },

  update : function( req, res, next ){
    _super.update( req, res, Channel, 'channel' );
  }
};
