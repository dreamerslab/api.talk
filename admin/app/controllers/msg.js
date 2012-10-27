var mongoose = require( 'mongoose' );
var Msg      = mongoose.model( 'Msg' );
var _super   = require( './application' );



module.exports = {

  index : function( req, res, next ){
    _super.index( req, res, Msg, 'msg' );
  },

  create : function( req, res, next ){
    _super.create( req, res, Msg );
  },

  destroy : function( req, res, next ){
    _super.destroy( req, res, Msg, 'msg' );
  },

  drop : function( req, res, next ){
    _super.drop( req, res, Msg );
  },

  update : function( req, res, next ){
    _super.update( req, res, Msg, 'msg' );
  }
};
