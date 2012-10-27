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


