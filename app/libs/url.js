var http = require( 'http' );
var _    = {};



_.ok = function( res, client_res, url, callback ){
  var data = '';

  client_res.setEncoding( 'utf8' );
  client_res.on( 'data', function( chunk ){
    data += chunk;
  }).on( 'end', function(){
    var match = data.toString().match( /<title>(.*)<\/title>/ );
    var title = match ? match[ 1 ] : 'No page title';

    callback( title, url );
  });
};

_.redirect = function( res, client_res, url, callback ){
  var _url = parseUri( client_res.headers.location ).host !== true ?
    url.host +  client_res.headers.location:
    client_res.headers.location;

  this.get( _url, res, callback );
};

_.not_found = function( res, client_res, url, callback ){
  res( 44, '[libs][url][get] Requested page not found' );
};

_[ '200' ] = _[ '304' ] = _.ok;
_[ '301' ] = _[ '302' ] = _.redirect;
_[ '404' ] = _.not_found;

_.get = function( str, res, callback ){
    var url = parseUri( str );

    if( url.host ){
      http.get({
        host : url.host,
        port : url.port,
        path : url.relative
      }, function( client_res ){
        var status = client_res.statusCode;

        if( _[ status ] !== undefined ){
          _[ status ]( res, client_res, url, callback );
          return;
        }

        res( 43, '[libs][url][get] Unknown status : ' + status );

      }).on( 'error', function( e ){
        res( 500, '[libs][url][get] Error : ' + e.message );
      });

      return;
    }

    res( 42, '[libs][url][get] Wrong url format : ' + str );
};



module.exports = {
  get : _.get
};



// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
function parseUri( str ){
  var o, m, uri, i;

  o   = parseUri.options;
  m   = o.parser[ o.strictMode ? 'strict' : 'loose' ].exec( str );
  uri = {};
  i   = 14;

  while( i-- ) uri[ o.key[ i ]] = m[ i ] || '';

  uri[ o.q.name ] = {};
  uri[ o.key[ 12 ]].replace( o.q.parser, function( $0, $1, $2 ){
    if( $1 ) uri[ o.q.name ][ $1 ] = $2;
  });

  return uri;
};



parseUri.options = {
  strictMode : false,
  key : [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host',
    'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
  ],
  q        : {
    name   : 'queryKey',
    parser : /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser   : {
    strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose  :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};
