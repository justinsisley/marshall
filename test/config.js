var marshall = require('../index.js');

// Configuration schema
var config = marshall({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'node-env',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8743,
    env: 'PORT',
    arg: 'port',
  },
  cacheDuration: {
    doc: 'Length of time to cache static assets in production mode.',
    format: 'nat',
    default: 1000 * 60 * 60 * 24 * 60, // 60 days
    env: 'CACHE_DURATION',
    arg: 'cache-duration',
  },
  api: {
    doc: 'The API the application communicates with.',
    format: 'url',
    default: 'http://localhost:8685',
    env: 'API',
    arg: 'api',
  },
});

module.exports = config;
