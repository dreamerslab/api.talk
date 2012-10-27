var Flow   = require( 'node.flow' );
var packer = require( 'node.packer' );

var js_path   = BASE_DIR + '/public/js/';
var main_path = js_path + 'main/';
var lib_path  = js_path + 'libs/';

var flow = new Flow({
  log  : true
});

var callback = function ( next ){
  return function ( err, stdout, stderr ){
    if( err ){
      console.log( err );
      return next( err );
    }

    next();
  };
};



flow.series( function ( arg, next ){
  arg.callback = callback( next );

  packer( arg );
}, {
  input : [
    main_path + 'start.js',
    main_path + 'config.js',
    main_path + 'helper.js',
    main_path + 'focus.js',
    main_path + 'key_controll.js',
    main_path + 'data.js',
    main_path + 'validate.js',
    main_path + 'model.js',
    main_path + 'view.js',
    main_path + 'action.js',
    main_path + 'execute.js',
    main_path + 'end.js'
  ],
  output: js_path + 'main.js'
}).

series( function ( arg, next ){
  arg.callback = callback( next );

  packer( arg );
}, {
  minify : true,
  input : [
    lib_path + 'jquery.center.min.js',
    lib_path + 'jquery.msg.min.js',
    lib_path + 'jquery.hotkeys.min.js',
    js_path + 'main.js'
  ],
  output : js_path + 'app.js'
}).

end( function ( arg ){
  packer( arg );
}, {
  minify : true,
  input : [
    lib_path + 'modernizr-1.7.min.js',
    lib_path + 'jquery.validate.min.js',
    lib_path + 'jquery.form.min.js'
  ],
  output: js_path + 'common.js',
  callback : function ( err, stdout, stderr ){
    if( err ){
      return console.log( err );
    }

    LOG.debug( null, '[bg_jobs][prepare] Assets builded' );
  }
});
