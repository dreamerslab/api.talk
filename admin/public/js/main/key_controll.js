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


