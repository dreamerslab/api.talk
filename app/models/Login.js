var Login = require( BASE_DIR + '/db/schema' ).Login;



Login.statics = {

  create : function( req, res ){
    var params = req.params;

    new this({
      user_id       : params.user_id,
      user_name     : params.name,
      action        : req.action,
      channel_id    : params.channel_id,
      connection_id : req.connection_id
    }).save( function( e, history ){
      if( e ){
        LOG.error( 500, req, e );
        return res( 500, 'Having trouble with creating a new login history record' );
      }

      LOG.debug( req, 'Create new login history record', history );
    });
  }
};



require( 'mongoose' ).model( 'Login', Login );
