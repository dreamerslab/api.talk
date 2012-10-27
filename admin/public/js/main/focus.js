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


