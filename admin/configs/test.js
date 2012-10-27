global.HOST        = '96.126.97.203';
global.PORT        = 80;
global.ENCODING    = 'utf8';

// db
global.DB_URL      = 'mongodb://localhost/talk';
global.DB_USERNAME = '';
global.DB_PASSWORD = '';

global.LOGS        = [ 'sys', 'request', 'response', 'error', 'debug' ];
global.LIBS        = [ 'inflection','bg' ];

// timezone
process.env.TZ     = 'UTC';
