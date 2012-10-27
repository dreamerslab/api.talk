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


