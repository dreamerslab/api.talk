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


