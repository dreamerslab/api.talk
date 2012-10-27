# Api

## general/time
  - params :
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "time" : 1315896012693
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/general/time



## user/join
  - params :
    - name
    - channel_id
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "user_id" : "4e72bf9f3ca3c48418000009"
      }
    }

    {
      "status" : 200,
      "body" : {
        "user_id" : "4e72bffd3ca3c48418000010"
      }
    }

  - example :

<!---->

    curl -d "name=ben&channel_id=4e72bbc325b072bc17000001" http://127.0.0.1:3000/user/join

    curl -d "name=bibi&channel_id=4e72bbc325b072bc17000001" http://127.0.0.1:3000/user/join



## user/leave
  - params :
    - name
    - user_id
    - channel_id
  - response :

<!---->

    { "status" : 200 }

  - example :

<!---->

    curl -d "name=ben&user_id=4e72bf9f3ca3c48418000009&channel_id=4e72bbc325b072bc17000001" http://127.0.0.1:3000/user/leave



## channel/create
  - desc : if channel name is not found,
           create a new one and response it.
           otherwise response with the found channel
  - params :
    - url
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "channel" : {
          "name": "About | COSCUP 2011",
          "url": "coscup.org/2011/en/about/",
          "root": "coscup.org",
          "_id": "4e6efacc6789349b0700000d",
          "updated_at": 1315896012693,
          "created_at": 1315896012693,
          "user_count": 0
        }
      }
    }

  - example :

<!---->

    curl -d "url=http://coscup.org/2011/en/about/" http://127.0.0.1:3000/channel/create



## channel/info
  - desc : get channel info
  - params :
    - id
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "channel" : {
          "name": "About | COSCUP 2011",
          "url": "coscup.org/2011/en/about/",
          "root": "coscup.org",
          "_id": "4e6efacc6789349b0700000d",
          "updated_at": 1315896012693,
          "created_at": 1315896012693,
          "user_count": 0
        }
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/channel/info?id=4e6efacc6789349b0700000d



## channel/latest
  - params :
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "channels" : [{
          "name": "Ruby Conf Taiwan 2011",
          "url": "http://rubyconf.tw/2011/",
          "root": "rubyconf.tw",
          "_id": "4e72bbc325b072bc17000001",
          "updated_at": 1316142019220,
          "created_at": 1316142019220,
          "user_count": 0
        }]
      }
    }

  - example :

<!---->

curl http://127.0.0.1:3000/channel/latest



## channel/hottest
  - params :
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "channels" : [{
          "name": "Ruby Conf Taiwan 2011",
          "url": "http://rubyconf.tw/2011/",
          "root": "rubyconf.tw",
          "_id": "4e72bbc325b072bc17000001",
          "updated_at": 1316142019220,
          "created_at": 1316142019220,
          "user_count": 0
        }]
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/channel/hottest



## channel/related
  - params :
    - root
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "channels" : [{
          "name": "Coscup 2011",
          "url": "http://coscup.org/2011/en/",
          "root": "coscup.org",
          "_id": "4e72bbc325b072bc17000002",
          "updated_at": 1316142019221,
          "created_at": 1316142019221,
          "user_count": 0
        }]
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/channel/related?root=coscup.org



## channel/users
  - params :
    - channel_id
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "users" : [{
          "channel_id": "4e72bbc325b072bc17000001",
          "user_id": "4e72bf9f3ca3c48418000009",
          "user_name": "ben",
          "_id": "4e6efa376789349b07000006",
          "created_at": 1315895863439
        }]
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/channel/users?channel_id=4e72bbc325b072bc17000001



## msg/send
  - desc : private chat, send msg to a user
  - params :
    - sender_id ( user_id )
    - sender_name
    - receiver_id
    - content
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "msgs" : {
          "sender_id": "4e72bffd3ca3c48418000010",
          "sender_name": "bibi",
          "receiver_id": "4e72bf9f3ca3c48418000009",
          "receiver_type": "user",
          "content": "hi back",
          "_id": "4e6efd4a6789349b07000015",
          "created_at": 1315896650002
        }
      }
    }

  - example :

<!---->

    curl -d "sender_id=4e72bf9f3ca3c48418000009&sender_name=ben&receiver_id=4e72bffd3ca3c48418000010&content=hi" http://127.0.0.1:3000/msg/send

    curl -d "sender_id=4e72bffd3ca3c48418000010&sender_name=bibi&receiver_id=4e72bf9f3ca3c48418000009&content=hi back" http://127.0.0.1:3000/msg/send



## msg/receive
  - desc : private chat, call for old msg history from a given timestamp
  - params :
    - receiver_id ( user_id )
    - timestamp
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "msgs" : [{
          "sender_id": "4e72bffd3ca3c48418000010",
          "sender_name": "bibi",
          "receiver_id": "4e72bf9f3ca3c48418000009",
          "receiver_type": "user",
          "content": "hi back",
          "_id": "4e6efd4a6789349b07000015",
          "created_at": 1315896650002
        }]
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/msg/receive?receiver_id=4e72bf9f3ca3c48418000009&timestamp=1311134040001

    curl http://127.0.0.1:3000/msg/receive?receiver_id=4e72bffd3ca3c48418000010&timestamp=1311134040001



## msg/watch
  - desc : watch for private incoming msg. we use one connection to monitor all private msgs.
  - params :
    - receiver_id ( user_id )
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "msg" : {
          "sender_id": "4e72bffd3ca3c48418000010",
          "sender_name": "bibi",
          "receiver_id": "4e72bf9f3ca3c48418000009",
          "receiver_type": "user",
          "content": "hi back",
          "_id": "4e6efd4a6789349b07000015",
          "created_at": 1315896650002
        }
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/msg/watch?receiver_id=4e72bf9f3ca3c48418000009

    curl http://127.0.0.1:3000/msg/watch?receiver_id=4e72bffd3ca3c48418000010



## msg/send_to_channel
  - desc : send msg to a channel
  - params :
    - sender_id ( user_id )
    - sender_name
    - channel_id
    - content
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "msg" : {
          "sender_id": "4e72bffd3ca3c48418000010",
          "sender_name": "bibi",
          "receiver_id": "4e72bf9f3ca3c48418000009",
          "receiver_type": "channel",
          "content": "hi",
          "_id": "4e6efd4a6789349b07000015",
          "created_at": 1315896650002
        }
      }
    }

  - example :

<!---->

    curl -d "sender_id=4e72bf9f3ca3c48418000009&sender_name=ben&channel_id=4e72bbc325b072bc17000001&content=hi" http://127.0.0.1:3000/msg/send_to_channel



## msg/receive_from_channel
  - desc : call for old msg history for this channel from a given timestamp
  - params :
    - channel_id
    - timestamp
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "msgs" : [{
          "sender_id": "4e72bffd3ca3c48418000010",
          "sender_name": "bibi",
          "receiver_id": "4e72bf9f3ca3c48418000009",
          "receiver_type": "channel",
          "content": "hi",
          "_id": "4e6efd4a6789349b07000015",
          "created_at": 1315896650002
        }]
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/msg/receive_from_channel?channel_id=4e72bbc325b072bc17000001&timestamp=1311134040001



## msg/watch_channel
  - params :
    - channel_id
  - response :

<!---->

    {
      "status" : 200,
      "body" : {
        "msg" : {
          "sender_id": "4e72bffd3ca3c48418000010",
          "sender_name": "bibi",
          "receiver_id": "4e72bf9f3ca3c48418000009",
          "receiver_type": "channel",
          "content": "hi",
          "_id": "4e6efd4a6789349b07000015",
          "created_at": 1315896650002
        }
      }
    }

  - example :

<!---->

    curl http://127.0.0.1:3000/msg/watch_channel?channel_id=4e72bbc325b072bc17000001


