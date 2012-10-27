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


