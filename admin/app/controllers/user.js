var mongoose = require( 'mongoose' );
var User     = mongoose.model( 'User' );
var _super   = require( './application' );



module.exports = {

  index : function( req, res, next ){
    _super.index( req, res, User, 'user' );
  },

  create : function( req, res, next ){
    _super.create( req, res, User );
  },

  destroy : function( req, res, next ){
    _super.destroy( req, res, User, 'user' );
  },

  drop : function( req, res, next ){
    _super.drop( req, res, User );
  },

  update : function( req, res, next ){
    _super.update( req, res, User, 'user' );
  }
};
