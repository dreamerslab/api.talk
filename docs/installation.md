# Installation

## MAC

  - Install homebrew

<!---->

    $ ruby -e "$(curl -fsSLk https://gist.github.com/raw/323731/install_homebrew.rb)"


  - Install Xcode
  - Install node.js

<!---->

    $ brew update
    $ brew install node


  - Install npm

<!---->

    $ curl http://npmjs.org/install.sh | clean=no sh


  - Install mongodb

<!---->

    $ brew install mongodb


  - Create db directory

<!---->

    $ mkdir /usr/local/db


  - Clone this project to your webroot

<!---->

    $ cd /path/to/webroot
    $ git clone https://github.com/dreamerslab/api.talk.git


  - Install packages

<!---->

    $ npm install



## UBUNTU

  - Install node
    - detail https://github.com/joyent/node/wiki/Installation

<!---->

    $ sudo apt-get install python-software-properties
    $ sudo add-apt-repository ppa:chris-lea/node.js
    $ sudo apt-get update
    $ sudo apt-get install nodejs
    $ sudo apt-get install nodejs-dev

  - Install npm

<!---->

    $ curl http://npmjs.org/install.sh | sudo clean=no sh

  - Install mongodb
    - detail http://www.mongodb.org/display/DOCS/Ubuntu+and+Debian+packages

<!---->

    // switch to super user
    $ sudo su

    // add 10gen GPG key
    $ apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10

    // add to source.list for using upstart to manage mongodb
    $ echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" >> /etc/apt/sources.list

    // install
    $ apt-get update
    $ apt-get install mongodb-10gen
    $ exit


  - Clone this project to your webroot

<!---->

    $ cd /path/to/webroot
    $ git clone https://github.com/dreamerslab/api.talk.git


  - Install packages

<!---->

    $ npm install


