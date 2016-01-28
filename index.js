var parser = require('./lib/parser');

var marshall = function marshall(config) {
  var parsedConfig = {};
  var parsedProp;
  var docs = [];

  // Iterate configuration object
  for (var prop in config) {
    if (config.hasOwnProperty(prop)) {
      // Parse each property to validate and retrieve the final value
      parsedConfig[prop] = parser.parse(prop, config[prop], marshall.locale);

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
    }
  };
};

// Default locale
marshall.locale = 'en-US';

module.exports = marshall;
