;( function( $, w, doc ){


//--- config ----------------------------------------------------------------------------------------

  $.msg( 'overwriteGlobal', 'bgPath', '/img/' ).
    msg( 'overwriteGlobal', 'autoUnblock', false );



//--- helper ----------------------------------------------------------------------------------------

  var helper = {

    _event : function( e ){
      var key_code = e.keyCode;

      if([ 8, 37, 38, 39, 40 ].indexOf( key_code ) > -1 ){
        e.stopPropagation();
      }
    },

    editable : function( callback ){
      var self, $overlay, $editable, remove, event;

      self      = this;
      $overlay  = $( '#overlay' );
      $editable = $( '#editable' );

      remove = function(){
        focus.out( $overlay );
        $overlay.remove();
      };

      event = function( e ){
        self._event( e );
        if( e.keyCode === 13 ){
          e.preventDefault();
        }
      };

      $editable.bind( 'keydown', event ).
                bind( 'keypress', event ).
                bind( 'keydown', 'return', function(){
                  callback( $editable );
                  $overlay.remove();
                }).bind( 'click', function( e ){
                  e.stopPropagation();
                }).focus().select();

      focus[ 'in' ]( $editable ).
           add( $editable, 'keydown-esc', remove );

      $overlay.bind( 'click', remove );
    },

    info : function( $btn, e ){
      e.preventDefault();

      return {
        title : $btn.attr( 'title' ),
        type : $btn.attr( 'type' ),
        url : $btn.attr( 'href' )
      };
    },

    msg : function( callback ){
      var $msg, $input, unblock;

      $msg   = $( '#jquery-msg-overlay' );
      $input = $msg.find( 'input' );

      unblock = function(){
        focus.out( $msg );
        $.msg( 'unblock', 0 );
      };

      focus[ 'in' ]( $msg );
      $msg.find( '.no' ).bind( 'click', unblock );
      focus.add( $msg, 'keydown-esc', unblock );
      $input.first().focus();
      $input.bind( 'keydown', this._event ).
             bind( 'keypress', this._event );

      return this;
    },

    select : function( $obj, action ){
      $obj[ action ]( 'selected' );
      return this;
    },

    select_all : function( $rows, e ){
      e.preventDefault();

      this.select( $rows, 'addClass' );
    },

    submit : function( args ){
      args.$form.ajaxSubmit({
        method: 'POST',
        target : '#jquery-msg-content',
        dataType : 'json',
        data : args.data || {},
        beforeSubmit : args.before || function(){},
        success : args.success
      });
    }
  };



//--- focus -----------------------------------------------------------------------------------------

  var focus = {
    _counter : 0,

    _id : function( $target ){
      return $target.attr( '_focus' );
    },

    _current : function(){
      var self, id, $focus, amount;

      self   = this;
      id     = -1;
      $focus = $( '[_focus]' ).filter( ':not(:hidden)' );
      amount = $focus.length;

      if( amount > 0 ){
        $focus.each( function(){
          id = Math.max( id, self._id( $( this )));
        });
      }

      return this[ id ];
    },

    'in' : function( $target ){
      $target.attr( '_focus', this._counter );
      this[ this._counter ] = {};
      this._counter++;

      return this;
    },

    out : function( $target ){
      delete this[ this._id( $target )];

      return this;
    },

    // ex: $doc, 'keydown-esc', fn
    add : function( $target, key, fn ){
      var id = this._id( $target );

      if( id != undefined ) this[ id ][ key ] = fn;

      return this;
    },

    // args: key, arg1, arg2, arg3 ...
    // ex: 'keydown-esc', $rows
    execute : function(){
      var key = [].shift.call( arguments );

      this._current()[ key ].apply( this, arguments );

      return this;
    }
  };



//--- key control -----------------------------------------------------------------------------------

  var key_controll = {
    current_keydown : null,

    _key_code : {
      8 : 'delete',
      27 : 'esc',
      37 : 'pre',
      38 : 'up',
      39 : 'next',
      40 : 'down'
    },

    _prevent_default : function( e ){
      if( [ 8, 27, 37, 38, 39, 40 ].indexOf( e.keyCode ) > -1 ){
        e.preventDefault();
      }

      return this;
    },

    init : function( $doc ){
      var self = this;

      // it only works when keydown go before keypress
      // webkit does not fire keypress on non charator keys
      $doc.bind( 'keydown', function( e ){ // bug - webkit keeps fireing keydown event handler when the key is pressed
        self._prevent_default( e );

        try{
          focus.execute( 'keydown-' + self._key_code[ e.keyCode ], e );
        }catch( e ){
          // console.log( e );
        }

        self.current_keydown = e.keyCode;
      }).
      bind( 'keypress', self._prevent_default ). // opera
      bind( 'keydown', 'meta+a', function( e ){
        focus.execute( 'keydown-meta+a', e );
      }).
      bind( 'keydown', 'ctrl+a', function( e ){
        focus.execute( 'keydown-ctrl+a', e );
      }).
      bind( 'keydown', 'meta+n', function( e ){
        focus.execute( 'keydown-meta+n', e );
      }).
      bind( 'keydown', 'ctrl+n', function( e ){
        focus.execute( 'keydown-ctrl+n', e );
      }).
      bind( 'keydown', 'meta+d', function( e ){
        focus.execute( 'keydown-meta+d', e );
      }).
      bind( 'keydown', 'ctrl+d', function( e ){
        focus.execute( 'keydown-ctrl+d', e );
      }).
      bind( 'keyup', function( e ){
        self.current_keydown = null;
      });
    }
  };



//--- data ------------------------------------------------------------------------------------------

  var data = {

    channel : {
      'Name' : 'name',
      'Url' : 'url',
      'Root' : 'root',
      'Protocol' : 'protocol',
      'User Count' : 'user_count'
    },

    channel_user : {
      'Channel ID' : 'channel_id',
      'User ID' : 'user_id',
      'User Name' : 'user_name'
    },

    login : {
      'User ID' : 'user_id',
      'User Name' : 'user_name',
      'Action' : 'action',
      'Channel ID' : 'channel_id',
      'Connection ID' : 'connection_id'
    },

    msg : {
      'Sender ID' : 'sender_id',
      'Sender Name' : 'sender_name',
      'Receiver ID' : 'receiver_id',
      'Receiver type' : 'receiver_type',
      'Content' : 'content'
    },

    user : {
      'Name' : 'name'
    }

  };


  data.module_channel = data.channel;
  data.module_user = data.user;

//--- validate --------------------------------------------------------------------------------------

  var rules = {};

  ( function(){
    var _default, _date, _url;

    _default = {
      required : true
    };

    _date = {
      required: true,
      date: true
    };


    _url = {
      required : true,
      url : true
    };

    rules = {

      channel : {
        'record[name]' : _default,
        'record[url]' : _url,
        'record[root]' : _url,
        'record[protocol]' : _default
      },

      channel_user : {
        'record[channel_id]' : _default,
        'record[user_id]' : _default,
        'record[user_name]' : _default
      },

      login : {
        'record[user_id]' : _default,
        'record[user_name]' : _default,
        'record[action]' : _default,
        'record[channel_id]' : _default,
        'record[connection_id]' : _default
      },

      msg : {
        'record[sender_id]' : _default,
        'record[sender_name]' : _default,
        'record[receiver_id]' : _default,
        'record[receiver_type]' : _default,
        'record[content]' : _default
      },

      user : {
        'record[name]' : _default
      }
    };

  })();



//--- model -----------------------------------------------------------------------------------------

  var model = {

    _submit : function( $form, msg ){
      helper.submit({
        $form : $form,
        success: function( rsp ){
          var _msg = rsp[ 'success' ] == true ?
            msg :
            'Shit happened';

          $.msg( 'replace', _msg ).
            msg( 'unblock', 3000 );

          w.location.reload();
        }
      });
    },

    _validate : function( info ){
      var self, $form;

      self  = this;
      $form = $( '#' + info.type + '-create' );

      $form.validate({
        rules : rules[ info.type ],
        submitHandler : function(){
          self._submit( $form, 'New record created' );
        }
      });
    },

    create : function( $btn, e ){
      var self, info;

      self = this;
      info = helper.info( $btn, e );

      $.msg({
        content : view.create( info.title, info.url, data[ info.type ]),
        afterBlock : function(){
          helper.msg();
          self._validate( info );
        }
      });

      return this;
    },

    destroy : function( $btn, $rows, e ){
      var self, _$rows, info, selected;

      self   = this;
      _$rows = $rows.filter( '.selected' );
      info   = helper.info( $btn, e );

      if( _$rows.length === 0 ){
        return this;
      }

      selected = [];

      _$rows.each( function(){
        selected.push( $( this ).attr( '_id' ));
      });

      $.msg({
        content : view.destroy( info.title, info.url, selected ),
        afterBlock : function(){
          var $form = $( '#' + info.type + '-destroy' );

          helper.msg();
          $form.find( '.yes' ).bind( 'click', function( e ){
            e.preventDefault();
            self._submit( $form, 'Record deleted' );
          });

        }
      });

      return this;
    },

    drop : function( $btn, controller, action, e ){
      var self, raw, tmp, _tmp, i, condition;

      e.preventDefault();

      self = this;
      raw  = $btn.attr( 'href' ).match( /\?(.*)/ );

      if( raw ){
        tmp = raw[ 1 ].match( /([^&;=]+)=?([^&;]*)/g );
        condition = {};
        for( i = tmp.length; i--; ){
          _tmp = tmp[ i ].match( /([^&;=]+)=?([^&;]*)/ );
          condition[ _tmp[ 1 ]] = _tmp[ 2 ];
        }
      }

      $.msg({
        content : view.drop( action, raw, condition ),
        afterBlock : function(){
          var $form = $( '#' + controller + '-drop' );

          helper.msg();
          $form.find( '.yes' ).bind( 'click', function( e ){
            e.preventDefault();
            self._submit( $form, 'All records deleted' );
          });
        }
      });
    },

    update : function( $field, controller, name ){
      var val;

      helper.submit({
        $form : $( '#' + controller + '-update' ),
        before : function( arr, $form, options ){
          var i = arr.length;

          for( ;i--; ){
            if( arr[ i ].name == 'record[' + name + ']' ){
              val = arr[ i ].value;
            }
          }
        },
        success : function( rsp ){
          $field.text( val );

          if( rsp[ 'success' ] != true ){
            $.msg({ content : 'Shit happened' }).
              msg( 'unblock', 1000 );
          }
        }
      });
    }
  };



//--- view ------------------------------------------------------------------------------------------

  var view = {

    _list : function( record ){
      var name, body;

      body = '';

      for( name in record ){
        body += '<div class="msg-row clearfix">' +
                  '<label class="msg-row-title">' + name + ' : </label>' +
                  '<input class="msg-row-content" type="text" name="record[' + record[ name ] + ']"/>' +
                '</div>';
      }

      return body;
    },

    _selected : function( selected ){
      var body, i, j;

      body = '';
      i    = 0;
      j    = selected.length;

      for( ; i < j; i++ ){
        body += '<div class="msg-row">' +
                  selected[ i ] +
                  '<input name="records[' + i + ']" value="' + selected[ i ] + '" type="hidden"/>' +
                '</div>';
      }

      return body;
    },

    form : function( title, action, body ){
      var id = action.replace( '/', '' ).replace( '/', '-' );

      return '<div class="msg-header"><h3>' + title + '</h3></div>' +
             '<form id="' + id + '" accept-charset="utf-8" method="post" action="' + action + '">' +
               '<div class="msg-content">' + body + '</div>' +
               '<div class="msg-footer">' +
                 '<input class="yes" type="submit" value="Confirm">' +
                 '<input class="no" type="button" value="Cancel">' +
               '</div>' +
             '</form>';
    },

    create : function( title, action, record ){
      return this.form( title, action, this._list( record ));
    },

    destroy : function( title, action, selected ){
      return this.form( title, action, this._selected( selected ));
    },

    drop : function( action, raw, condition ){
      var tmp, key, body;

      if( raw ){
        tmp = '';
        for( key in condition ){
          tmp += '<input type="hidden" name="' + key + '" value="' + condition[ key ] + '"/>';
        }

        body = '<p>Are you sure you want to delete records <br />where `' + raw[ 1 ] + '`?</p>' + tmp;
      }else{
        body = '<p>Are you sure?</p>';
      }


      return this.form( 'Delete all records', action, body );
    },

    edit : function( controller, id, name, val, w, x, y ){
      return '<div id="overlay">' +
               '<div id="msg-wrap" style="left:' + x + 'px; top:' + y + 'px;">' +
                 '<form id="' + controller + '-update" accept-charset="utf-8" method="post" action="/' + controller + '/update">' +
                   '<input name="id" value="' + id + '" type="hidden"/>' +
                   '<input id="editable" name="record[' + name + ']" value="' + val + '" style=" width:' + w + 'px;" type="text"/>' +
                 '</form>' +
               '</div>' +
             '</div>';
    }

  };



//--- action ----------------------------------------------------------------------------------------

  var action = {

    init : function( $doc, $records, $rows ){
      var self, tmp;

      self = this;

      focus[ 'in' ]( $records );
      key_controll.init( $doc );

      focus.add( $records, 'keydown-esc', function( e ){
        $rows.removeClass( 'latest' );
        helper.select( $rows, 'removeClass' );
      });

      tmp = w.location.pathname.match( /\w+/ );

      this.controller = tmp !== null ? tmp[ 0 ] : null;

      return this;
    },

    select : function( $rows ){
      var self = this;

      $rows.find( 'a' ).bind( 'click', function( e ){
        e.stopPropagation();
      });

      $rows.bind( 'click', function( e ){
        var $this, action, last_index, current_index, start, end;

        e.stopPropagation();

        $this = $( this );

        // if shift key is pressed
        if( key_controll.current_keydown === 16 ){
          last_index    = $rows.index( $rows.filter( '.latest' ));
          current_index = $rows.index( $this );

          if( last_index < current_index ){
            start = last_index;
            end   = current_index + 1;
          }else{
            start = current_index;
            end   = last_index + 1;
          }

          $rows.slice( start, end ).addClass( 'selected' );
        }else{
          action = $this.hasClass( 'selected' ) ? 'removeClass' : 'addClass';
          helper.select( $this, action );
          $rows.removeClass( 'latest' );
          $this.addClass( 'latest' );
        }
      });

      return this;
    },

    select_all : function( $records, $btn, $rows ){
      var select_all = function( e ){
        helper.select_all( $rows, e );
      };

      $btn.bind( 'click', select_all );

      focus.add( $records, 'keydown-meta+a', select_all ).
            add( $records, 'keydown-ctrl+a', select_all );

      return this;
    },

    unselect : function( $content, $toolbar, $rows ){
      $content.bind( 'click', function(){
        helper.select( $rows, 'removeClass' );
      });

      $toolbar.bind( 'click', function( e ){
        e.stopPropagation();
      });

      return this;
    },

    create : function( $records, $btn ){
      var create = function( e ){
        model.create( $btn, e );
      };

      $btn.bind( 'click', create );

      focus.add( $records, 'keydown-meta+n', create ).
            add( $records, 'keydown-ctrl+n', create );

      return this;
    },

    destroy : function( $records, $btn, $rows ){
      var destroy = function( e ){
        model.destroy( $btn, $rows, e );
      };

      $btn.bind( 'click', destroy );

      focus.add( $records, 'keydown-delete', destroy );

      return this;
    },

    drop : function( $records, $btn ){
      var controller, action, drop;

      controller = this.controller;
      action     = '/' + controller + '/drop';
      drop       = function( e ){
        model.drop( $btn, controller, action, e );
      };

      $btn.bind( 'click', drop );

      focus.add( $records, 'keydown-meta+d', drop ).
            add( $records, 'keydown-ctrl+d', drop );

      return this;
    },

    edit : function( $wrap, $rows ){
      var controller = this.controller;

      $rows.find( 'span' ).bind( 'click', function( e ){
        if( $( this ).parents( 'tr' ).is( '.selected' )){
          e.stopPropagation();
        }
      }).bind( 'dblclick', function( e ){
        var $this, id, w, x, y, action, name, val;

        $this = $( this );
        id    = $this.parents( 'tr' ).attr( '_id' );
        w     = $this.width() + 6;
        x     = $this.offset().left - 3;
        y     = $this.offset().top - 3.5;
        name  = $this.attr( '_type' );
        val   = $this.text();

        $wrap.append( view.edit( controller, id, name, val, w, x, y ));
        helper.editable( function( $editable ){
          model.update( $this, controller, name );
        });
      });

      return this;
    }

  };



//--- execute ---------------------------------------------------------------------------------------

  $( function(){
    var $doc, $wrap, $content, $toolbar,
    $create_btn, $delete_btn, $drop_btn, $select_btn,
    $records, $rows;

    $doc        = $( doc );
    $wrap       = $( '#wrap' );
    $content    = $( '#content' );
    $toolbar    = $( '#toolbar' );
    $create_btn = $toolbar.find( '.toolbar-create' );
    $delete_btn = $toolbar.find( '.toolbar-delete' );
    $drop_btn   = $toolbar.find( '.toolbar-drop' );
    $select_btn = $toolbar.find( '.toolbar-select' );
    $records    = $( '#records' );
    $rows       = $records.find( '.row' );



    action.init( $doc, $records, $rows ).
           select( $rows ).
           select_all( $records, $select_btn, $rows ).
           unselect( $content, $toolbar, $rows ).
           create( $records, $create_btn ).
           destroy( $records, $delete_btn, $rows ).
           drop( $records, $drop_btn ).
           edit( $wrap, $rows );


  });



})( jQuery, window, document );
