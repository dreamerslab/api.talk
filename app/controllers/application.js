module.exports = {

  check_params : function( conditions, req, res, next ){
    var buf = 'var params = req.params; if( ' + conditions + ' ){ LOG.debug( req,"[application/check_params] All required params found", "' + conditions + '" ); next( params ); return;} res( 40, "Missing params" );';
    return new Function( 'req', 'res', 'next', buf )( req, res, next );
  }
};
