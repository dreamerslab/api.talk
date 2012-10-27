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


