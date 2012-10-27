var env = process.env.NODE_ENV;

if( env == 'production' ) env = 'prod';

global.ENV = env || 'dev';
