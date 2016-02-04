var marshall = require('../index');

// Configuration schema
var config = marshall({
  env: {
    doc: 'The application environment',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'node-env',
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 8743,
    env: 'PORT',
    arg: 'port',
  },
  cacheDuration: {
    doc: 'Length of time to cache static assets',
    format: 'nat',
    default: 5184000000, // 60 days
    env: 'CACHE_DURATION',
    arg: 'cache-duration',
  },
  api: {
    doc: 'The API the application communicates with',
    format: 'url',
    default: 'https://api.company.com',
    env: 'API',
    arg: 'api',
  },
});

module.exports = config;
