# Flow


## Mobile Client

> Views

  - init : start page with logo
  - channels : channel list
  - chat : chat room

> Actions

    - [v] init
    - [v] channel
      - [api] channel/index
        - [v] chat
          - [api] user/join
            - [api] channel/users
              - [api] msg/receive_from_channel
                - [api] msg/watch_channel
                - [api] msg/send_to_channel
              - [api] msg/receive
                - [api] msg/watch
                - [api] msg/send
            - [api] user/leave



## Main Site

> Views

  - home
  - about
  - channel/index
  - channel/create
  - chat

> Actions

    - [v] home
      - [v] about
      - [v] chat
        - [api] user/join
          - [api] channel/users
            - [api] msg/receive_from_channel
              - [api] msg/watch_channel
              - [api] msg/send_to_channel
            - [api] msg/receive
              - [api] msg/watch
              - [api] msg/send
          - [api] user/leave
      - [v] channels/index
        - [api] channel/index
          - the rest are the same from chat


