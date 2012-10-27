global.HOST        = '127.0.0.1';
global.PORT        = 3000;
global.ENCODING    = 'utf8';

// db
global.DB_URL      = 'mongodb://localhost/talk';
global.DB_USERNAME = 'ben';
global.DB_PASSWORD = 'whatever';

global.LOGS        = [ 'sys', 'connection', 'request', 'response', 'error', 'debug' ];
global.LIBS        = [ 'seed', 'disconnect' ];

// timezone
process.env.TZ     = 'UTC';

