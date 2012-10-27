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


