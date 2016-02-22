var parser = require('./lib/parser');

var marshall = function marshall(config) {
  var parsedConfig = {};
  var parsedProp;
  var docs = [];
  var envConfig = {};

  // Iterate configuration object
  for (var prop in config) {
    if (config.hasOwnProperty(prop)) {
      // Parse each property to validate and retrieve the final value
      parsedConfig[prop] = parser.parse(prop, config[prop], marshall.locale);

      // Create an envConfig object that returns key/value pairs with the
      // environment variable name as the key
      envConfig[config[prop].env] = JSON.stringify(parsedConfig[prop]);

      // Generate user-friendly docs
      docs.push(config[prop].doc + ' (' + prop + '): ' + parsedConfig[prop]);
    }
  }

  return {
    get: function get(key) {
      if (!key) {return parsedConfig;}
      return parsedConfig[key];
    },
    doc: function doc() {
      return '\n* ' + docs.join('\n* ') + '\n';
    },
    env: function env() {
      return envConfig;
    }
  };
};

// Default locale
marshall.locale = 'en-US';

module.exports = marshall;
