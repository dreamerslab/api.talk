SECRET.set( 'toolbar', function( type, find_raw ){
  return {
    Create  : {
      title : 'Create a new record',
      href  : '/' + type + '/create',
      klass : 'toolbar-create first',
      type  : type
    },

    Delete : {
      title : 'Delete records',
      href  : '/' + type + '/destroy',
      klass : 'toolbar-delete',
      type  : type
    },

    'Delete all' : {
      title : 'Delete all records',
      href  : '/' + type + '/drop' + find_raw,
      klass : 'toolbar-drop',
      type  : type
    },

    'Select all' : {
      title : 'Select all records',
      href  : '#',
      klass : 'toolbar-select last',
      type  : type
    }
  };
});

LOG.debug( null, '[bg_jobs][prepare] Toolbar builder function created' );
