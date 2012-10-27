HOOK.once( 'SYS.express-configured', function( app ){
  app.helpers({
    js : function( scripts ){
      var tmp, i, j;

      tmp = '';
      i   = 0;
      j   = scripts.length;

      for( ; i < j; i++ ){
        tmp = tmp + '<script src="/js/' + scripts[ i ]+ '.js"></script> ';
      }
      
      return tmp;
    },
    
    css : function( styles ){
      var tmp, i, j;

      tmp = '';
      i   = 0;
      j   = styles.length;

      for( ; i < j; i++ ){
        tmp = tmp + ' <link href="/css/' + styles[ i ] + '.css" rel="stylesheet"> ';
      }
      return tmp;
    },
    
    pager : function( from, count, limit ){
      var out, total, pages;
      
      from  = parseInt( from, 10 );
      total = Math.ceil( count / limit );
      pages = total > 5 ? 6 : total + 1;
      
      out = {
        total : total,
        pre : '',
        next : '',
        first : '',
        last : '',
        start : 1,
        end : pages,
        page : from / limit + 1,
        start_spacer : '',
        end_spacer : '',
        pre_from : from - limit,
        next_from : from + limit,
        each_from : 0,
        end_from : ( total - 1 ) * limit
      };
      
      if( from == 0 ) out.pre = 'hidden';
      if( from >= count - limit ) out.next = 'hidden';
      
      if( out.page <= 3 ){
        out.first = 'hidden';
      }
      
      if( out.page <= 4 ){
        out.start_spacer = 'hidden';
      }
      
      if( out.page > 3 ){
        out.start = out.page - 2;
        out.end = out.page + 3;
        out.each_from += from - limit * 2;
      }
      
      if(( out.page + 3 ) >= total ){
        out.end = total + 1;
        out.last = 'hidden';
        out.end_spacer = 'hidden';
      }
      
      if( total <= 6 ){
        out.last = 'hidden';
        out.end_spacer = 'hidden';
      }
      
      return out;
    }
  });

  app.dynamicHelpers({
    scripts : function( req, res ){
      return [ 'common' ]; //this will be available in all views
    },
    
    styles : function( req, res ){
      return [ 'common' ]; //this will be available in all views
    }
  });
});
