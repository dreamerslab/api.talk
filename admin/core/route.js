var fs, dispatch;

fs       = require( 'fs' );
dispatch = function( app, method, pattern, path ){
  var _path, controller;

  _path      = path.split( '/' );
  controller = require( CONTROLLER_DIR + _path[ 0 ]);

  app[ method ]( pattern, controller[ _path[ 1 ]]);
  LOG.sys( 'Dispatching handler: ' + path + ' for route: ' + pattern );
};



HOOK.once( 'SYS.express-configured', function( app ){

  global.ROUTE = {

    get : function( pattern, path ){
      dispatch( app, 'get', pattern, path );

      return this;
    },

    post : function( pattern, path ){
      dispatch( app, 'post', pattern, path );

      return this;
    },

    put : function( pattern, path ){
      dispatch( app, 'put', pattern, path );

      return this;
    },

    'delete' : function( pattern, path ){
      dispatch( app, 'delete', pattern, path );

      return this;
    },

    resources : function ( name, klass ){
      var _class = klass === undefined ?
        name : klass;

      this.get( '/' + name + '/new', _class + '/new' ).
           get( '/' + name, _class + '/index' ).
           get( '/' + name + '/:id', _class + '/show' ).
           get( '/' + name + '/:id/edit', _class + '/edit' ).
           put( '/' + name + '/:id', _class + '/update' ).
           post( '/' + name, _class + '/create' )
           [ 'delete' ]( '/' + name + '/:id', _class + '/destroy' );

      return this;
    }
  };
});



HOOK.once( 'SYS.models-loaded', function( app ){
  require( CONF_DIR + 'routes' );
  HOOK.emit( 'SYS.routes-configured', app );
});
