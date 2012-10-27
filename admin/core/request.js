var http, req, res, ID;

http = require( 'http' );
ID = 0;



SECRET.set( 'EXPRESS.request', function( req, res, next ){
  ID++;
  req._id    = ID;
  res._id    = ID;
  res._start = Date.now();
  // log all request including error requests
  LOG.request( req );
  next();
});
