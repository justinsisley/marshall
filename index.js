var parser = require('./lib/parser');

var marshall = function marshall(config) {
  var parsedConfig = {};
  var parsedProp;

  for (var prop in config) {
    if (config.hasOwnProperty(prop)) {
      parsedProp = parser.parse(prop, config[prop], marshall.locale);
      parsedConfig[parsedProp.name] = parsedProp.value;
    }
  }

  return {
    get: function get(key) {
      return parsedConfig[key];
    }
  };
};

// Default locale
marshall.locale = 'en-US';

module.exports = marshall;
