module.exports = {

  _cond : function( query ){
    var name, key;

    var find     = {};
    var find_raw = '';
    var i        = 0;

    for( name in query ){
      key = name.split( '.' );
      if( key.length > 1 ){
        find[ key[ 1 ]] = query[ name ];
      }
      if( name.match( 'find' )){
        if( i == 0 ){
          find_raw = '?';
        }else{
          find_raw += '&';
        }
        find_raw += name + '=' + query[ name ];
        i++;
      }
    }

    return {
      find : find,
      find_raw : find_raw
    };
  },

  _index : function( req, res, Model, action, camel, args ){
    var query = req.query;
    var cond  = this._cond( query );

    var _args = UTIL.extend({
      action   : action,
      find     : cond.find,
      find_raw : cond.find_raw,
      sort     : query.sort || 'created_at',
      asc      : query.asc || 1,
      from     : query.from || 0,
      limit    : 20,
      title    : camel + ' Index',
      toolbar  : SECRET.execute( 'toolbar', action, cond.find_raw )
    }, args );

    Model.count( _args.find, function( e, count ){
      _args.count = count;

      Model.find( _args.find ).
            sort( _args.sort, _args.asc ).
            skip( _args.from ).
            limit( _args.limit ).run( function( e, records ){
              LOG.debug( req._id, '[' + _args.action + '/index] get all records', records );

              _args.records = records || [];

              res.render( action + '/index', _args );
            });
    });
  },

  _remove : function( Model, action, res, selected, i, next ){
    Model.findById( selected[ i ], function( e, record ){
      if( record ){
        next && next( selected[ i ]);
        record.remove();
        record.save();
        LOG.debug( res._id, '[' + action + '/destroy] remove record' , record );

        if( i === 0 ){
          rsp = {
            success : true
          };

          res.result = rsp;
          res.json( rsp );
        }
      }
    });
  },

  _res : function( e, res ){
    var rsp = e ? {
      success : false,
      body    : e
    } : {
      success : true
    };

    res.result = rsp;
    res.json( rsp );
  },

  _session : function( req, res, next ){
    if( req.session.admin ){
      LOG.debug( req._id, '[application/session] valid session' );
      next( req.session.admin );
    }else{
      res.json({
        success : 41
      });
    }
  },

  session : function( req, res, next, msg ){
    var session;

    if( req.session.admin ){
      session = req.session;

      LOG.debug( req._id, '[application/session] valid session', session );
      next( session.admin );
    }else{
      res.render( 'home/login', {
        title : msg || 'Please login',
        admin : null
      });
    }
  },

  module_index : function( req, res, Model, action ){
    var self = this;

    this.session( req, res, function( admin ){
      var camel = action.camelize();
      var args  = {};

      args.sidebar           = UTIL.extend( true, args.sidebar || {}, SECRET.get( 'sidebar' ));
      args.sidebar[ action ] = 'selected';
      args.admin             = admin;

      self._index( req, res, Model, action, camel, args );
    });
  },

  index : function( req, res, Model, action ){
    var self = this;

    this.session( req, res, function( admin ){
      var camel = action.camelize();
      var args  = {};

      args.sidebar                    = UTIL.extend( true, args.sidebar || {}, SECRET.get( 'sidebar' ));
      args.sidebar.raw[ camel ].klass = 'selected';
      args.admin                      = admin;

      self._index( req, res, Model, action, camel, args );
    });
  },

  create : function( req, res, Model, props ){
    var self = this;

    this._session( req, res, function( admin ){
      var _props = props !== undefined ?
        UTIL.extend( props, req.body.record ):
        req.body.record;

      new Model( _props ).save( function( e, record ){
        self._res( e, res );
      });
    });
  },

  destroy : function( req, res, Model, action, next ){
    var self = this;

    this._session( req, res, function( admin ){
      var params = req.body;
      var records;

      if( params.records ){
        records = {}.toString.call( params.records ) === '[object String]' ?
          [ params.records ] :
          params.records;
      }else{
        records = [];
      }

      var i = params.records.length;

      for( ; i-- ; ){
        self._remove( Model, action, res, records, i, next );
      }
    });
  },

  drop : function( req, res, Model ){
    var self = this;
    var find = this._cond( req.body ).find;

    this._session( req, res, function( admin ){
      Model.remove( find, function( e, count ){
        self._res( e, res );
      });
    });
  },

  update : function( req, res, Model, action ){
    var self = this;

    this._session( req, res, function( admin ){
      var params  = req.body;
      var _record = params.record;

      Model.findById( params.id, function( e, record ){
        var name;

        if( record ){
          for( name in _record ){
            record[ name ] = _record[ name ].replace( /\\n/g, '\n' );
            LOG.debug( res._id, '[' + action + '/update] update field: ' +  name, record[ name ]);
          }

          record.save( function( e, record ){
            self._res( e, res );
          });
        }
      });
    });
  }
};
