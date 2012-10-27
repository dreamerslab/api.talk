var fs, config, stream, i, tmp, log, sys, connection, request, response, error, debug;

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

  connection = config[ 'connection' ] ? function( socket ){
    var connection, address;

    connection = socket.handshake;
    address = connection.address;

    log( '\033[44m[ CONNECTION ]\033[m \033[33m' + connection.time +
      '\033[m\n\033[36m- id:\033[m \033[92m' + socket.id +
      '\033[m\n\033[36m- ip:\033[m \033[92m' + address.address + ":" + address.port +
      '\033[m\n\033[36m- header:\033[m \033[92m' + JSON.stringify( connection.headers, null, 2 ) +
      '\033[m\n'
    );
  }: function(){};

  // on
  request = config[ 'request' ] ? function( req ){
    log( '\033[44m[ RESQUEST ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- connection id:\033[m \033[92m' + req.connection_id +
      '\033[m\n\033[36m- id:\033[m \033[92m' + req.action_id +
      '\033[m\n\033[36m- action:\033[m \033[92m' + req.action +
      '\033[m\n\033[36m- params:\033[m \033[92m' + JSON.stringify( req.params, null, 2 ) +
      '\033[m\n'
    );
  }: function(){};

  // emit
  response = config[ 'response' ] ? function( req, status, start, body ){
    log( '\033[42m[ RESPONSE ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- connection id:\033[m \033[92m' + req.connection_id +
      '\033[m\n\033[36m- id:\033[m \033[92m' + req.action_id +
      '\033[m\n\033[36m- action:\033[m \033[92m' + req.action +
      '\033[m\n\033[36m- status:\033[m \033[92m' + status +
      '\033[m\n\033[36m- time:\033[m \033[92m' + ( Date.now() - start ) + ' ms' +
      '\033[m\n\033[36m- body:\033[m \033[92m' + JSON.stringify( body, null, 2 ) +
      '\033[m\n'
    );
  }: function(){};

  error = config[ 'error' ] ? function( status, req, msg ){
    log( '\033[41m[ ERROR ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- connection id:\033[m \033[92m' + req.connection_id +
      '\033[m\n\033[36m- id:\033[m \033[92m' + req.action_id +
      '\033[m\n\033[36m- action:\033[m \033[92m' + req.action +
      '\033[m\n\033[36m- status:\033[m \033[92m' + status +
      '\033[m\n\033[36m- msg:\033[m \033[92m' + JSON.stringify( msg, null, 2 ) +
      '\033[m\n'
    );
  }: function(){};

  debug = config[ 'debug' ] ? function( req, msg, obj ){
    var _obj = obj ?
      '\033[m\n\033[36m- obj:\033[m \033[92m' + JSON.stringify( obj, null, 2 ) :
      '';

    log( '\033[45m[ DEBUG ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- connection id:\033[m \033[92m' + req.connection_id +
      '\033[m\n\033[36m- id:\033[m \033[92m' + req.action_id +
      '\033[m\n\033[36m- action:\033[m \033[92m' + req.action +
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

  connection = config[ 'connection' ] ? function( socket ){
    var connection, address;

    connection = socket.handshake;
    address = connection.address;

    log( 'connection',
      '[ CONNECTION ] ' + connection.time +
      '\n- id: ' + socket.id +
      '\n- ip: ' + address.address + ":" + address.port +
      '\n- header: ' + JSON.stringify( connection.headers, null, 2 ) +
      '\n'
    );
  }: function(){};

  request = config[ 'request' ] ? function( req ){
    log( 'request',
      '[ RESQUEST ] ' + new Date() +
      '\n- connection id: ' + req.connection_id +
      '\n- id: ' + req.action_id +
      '\n- action: ' + req.action +
      '\n- params: ' + JSON.stringify( req.params, null, 2 ) +
      '\n'
    );
  }: function(){};

  response = config[ 'response' ] ? function( req, status, start, body ){
    log( 'response',
      '[ RESPONSE ] ' + new Date() +
      '\n- connection id: ' + req.connection_id +
      '\n- id: ' + req.action_id +
      '\n- action: ' + req.action +
      '\n- status: ' + status +
      '\n- time: ' + ( Date.now() - start ) + ' ms' +
      '\n- body: ' + JSON.stringify( body, null, 2 ) +
      '\n'
    );
  }: function(){};

  error = config[ 'error' ] ? function( status, req, msg ){
    log( 'error',
      '[ ERROR ] ' + new Date() +
      '\n- connection id: ' + req.connection_id +
      '\n- id: ' + req.action_id +
      '\n- action: ' + req.action +
      '\n- status: ' + status +
      '\n- msg: ' + JSON.stringify( msg, null, 2 ) +
      '\n'
    );
  }: function(){};

  debug = config[ 'debug' ] ? function( req, msg, data ){
    var _data = data ?
      '- data: ' + JSON.stringify( data ) :
      '';

    log( 'debug',
      '[ DEBUG ] ' + new Date() +
      '\n- connection id: ' + req.connection_id +
      '\n- id: ' + req.action_id +
      '\n- action: ' + req.action +
      '\n- msg: ' + msg +
      _data +
      '\n'
    );
  }: function(){};

}



global.LOG = {

  sys : sys,

  connection : connection,

  request : request,

  response : response,

  error : error,

  debug : debug
};