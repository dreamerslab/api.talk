var _super = require( './application' );



module.exports = {

  index : function( req, res, next ){
    _super.session( req, res, function( admin ){
      res.render( 'home/index', {
        title   : 'Welcome to talkpl.us',
        admin   : admin,
        sidebar : UTIL.extend( true, {}, SECRET.get( 'sidebar' ))
      });
    }, 'Welcome to talkpl.us' );
  },

  logout : function( req, res, next ){
    req.session.destroy();
    res.redirect( '/' );
  },

  login : function( req, res, next ){
    var params = req.body;

    if( params.user && params.passwd && params.user === 'dude' && params.passwd === 'sweet' ){
      req.session.admin = 'dude';
      res.redirect( '/home/index' );
    }else{
      res.render( 'home/error', {
        title : 'Login Error',
        admin : null
      });
    }
  }
};
