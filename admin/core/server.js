HOOK.once( 'SYS.routes-configured', function( app ){
  // start server
  app.listen( PORT, HOST );
  
  LOG.sys( 'Server running at http://' + HOST + ':' + PORT + '/' );
  
});
