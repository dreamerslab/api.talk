global.HOST        = '96.126.97.203';
global.PORT        = 80;
global.ENCODING    = 'utf8';

// db
global.DB_URL      = 'mongodb://localhost/talk';
global.DB_USERNAME = 'ben';
global.DB_PASSWORD = 'whatever';

global.LOGS        = [ 'request', 'error' ];
global.LIBS        = [ 'inflection','bg' ];

// timezone
process.env.TZ     = 'UTC';