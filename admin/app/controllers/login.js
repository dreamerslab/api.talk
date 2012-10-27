var mongoose = require( 'mongoose' );
var Login    = mongoose.model( 'Login' );
var _super   = require( './application' );



module.exports = {

  index : function( req, res, next ){
    _super.index( req, res, Login, 'login' );
  },

  create : function( req, res, next ){
    _super.create( req, res, Login );
  },

  destroy : function( req, res, next ){
    _super.destroy( req, res, Login, 'login' );
  },

  drop : function( req, res, next ){
    _super.drop( req, res, Login );
  },

  update : function( req, res, next ){
    _super.update( req, res, Login, 'login' );
  }
};
