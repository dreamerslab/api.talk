var fs, config, stream, i, tmp, log, sys, request, response, error, debug;

fs     = require( 'fs' );
config = {};
stream = {};
i      = LOGS.length;



if( ENV === 'dev' ){
  
  for( ; i--; ){
    tmp = LOGS[ i ];
    config[ tmp ] = {};
  }
  
  log = function( buf ){
    console.log( buf );
  };
  
  sys = config[ 'sys' ] ? function( msg ){
    log( '\033[46m[ SYSTEM ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- msg:\033[m \033[92m' + msg +
      '\033[m\n'
    );
  }: function(){};
  
  request = config[ 'request' ] ? function( req ){
    log( '\033[44m[ REQUEST ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- id:\033[m \033[92m' + req._id +
      '\033[m\n\033[36m- ip:\033[m \033[92m' + UTIL.ip( req ) +
      '\033[m\n\033[36m- url:\033[m \033[92m' + req.url +
      '\033[m\n\033[36m- method:\033[m \033[92m' + req.method +
      '\033[m\n\033[36m- header:\033[m \033[92m' + JSON.stringify( req.headers, null, 2 ) +
      '\033[m\n\033[36m- params:\033[m \033[92m' + JSON.stringify( req.body || req.query, null, 2 ) +
      '\033[m\n'
    );
  }: function(){};
  
  response = config[ 'response' ] ? function( status, res, body ){
    log( '\033[42m[ RESPONSE ]\033[m \033[33m' + new Date +
      '\033[m\n\033[36m- id:\033[m \033[92m' + res._id +
      '\033[m\n\033[36m- status:\033[m \033[92m' + status +
      '\033[m\n\033[36m- time:\033[m \033[92m' + ( Date.now() - res._start ) + ' ms' +
      '\033[m\n\033[36m- header:\033[m \033[92m' + JSON.stringify( res._headers, null, 2 ) +
      '\033[m\n\033[36m- body:\033[m \033[92m' + JSON.stringify( body, null, 2 ) +
      '\033[m\n'
    );
  }: function(){};
  
  error = config[ 'error' ] ? function( status, res, msg ){
    log( '\033[41m[ ERROR ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- id:\033[m \033[92m' + res._id +
      '\033[m\n\033[36m- status:\033[m \033[92m' + status +
      '\033[m\n\033[36m- msg:\033[m \033[92m' + JSON.stringify( msg, null, 2 ) +
      '\033[m\n'
    );
  }: function(){};
  
  debug = config[ 'debug' ] ? function( id, msg, obj ){
    var _obj = obj ? 
      '\033[m\n\033[36m- obj:\033[m \033[92m' + JSON.stringify( obj, null, 2 ) :
      '';
    
    log( '\033[45m[ DEBUG ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- id:\033[m \033[92m' + id +
      '\033[m\n\033[36m- msg:\033[m \033[92m' + msg +
      _obj +
      '\033[m\n'
    );
  }: function(){};
  
}else{
  
  for( ; i--; ){
    tmp = LOGS[ i ];
    config[ tmp ] = {};
    stream[ tmp ] = fs.createWriteStream( BASE_DIR + '/logs/' + tmp + '.log', { flags: 'a' });
  }
  
  log = function( path, buf ){
    stream[ path ].write( buf, 'ascii' );
  };
  
  sys = config[ 'sys' ] ? function( msg ){
    log( 'sys',
      '[ SYSTEM ] ' + new Date() +
      '\n- msg: ' + msg +
      '\n'
    );
  }: function(){};
  
  request = config[ 'request' ] ? function( req ){
    log( 'request',
      '[ REQUEST ] ' + new Date() +
      '\n- id: ' + req._id +
      '\n- ip: ' + UTIL.ip( req ) +
      '\n- url: ' + req.url +
      '\n- method: ' + req.method +
      '\n- header: ' + JSON.stringify( req.headers, null, 2 ) +
      '\n- params: ' + JSON.stringify( req.body || req.query ) +
      '\n'
    );
  }: function(){};
  
  response  = config[ 'response' ] ? function( status, res, body ){
    log( 'response',
      '[ RESPONSE ] ' + new Date +
      '\n- id: ' + res._id +
      '\n- status: ' + status +
      '\n- time: ' + ( Date.now() - res._start ) + ' ms' +
      '\n- header: ' + JSON.stringify( res._headers, null, 2 ) +
      '\n- body: ' + JSON.stringify( body, null, 2 ) +
      '\n'
    );
  }: function(){};
  
  error = config[ 'error' ] ? function( status, res, msg ){
    log( 'error',
      '[ ERROR ] ' + new Date() +
      '\n- id: ' + res._id +
      '\n- status: ' + status +
      '\n- msg: ' + JSON.stringify( msg, null, 2 ) +
      '\n'
    );
  }: function(){};
  
  debug = config[ 'debug' ] ? function( id, msg, obj ){
    var _obj = obj ? 
      '- obj: ' + JSON.stringify( obj ) :
      '';
    
    log( 'debug',
      '[ DEBUG ] ' + new Date() +
      '\n- id: ' + id +
      '\n- msg: ' + msg +
      _obj +
      '\n'
    );
  }: function(){};
}



global.LOG = {
  
  sys : sys,
  
  request : request,
  
  response : response,
  
  error : error,
  
  debug : debug
};