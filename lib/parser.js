var environment = require('./environment');
var validator = require('./validator');
var args = require('./args');

module.exports = {
  parse: function parser(name, config, locale) {
    var value = config.default;
    var format = config.format;
    var env = config.env;
    var arg = config.arg;

    if (environment.isNode()) {
      // Allow environment variable to override
      if (env && process.env[env]) {
        value = process.env[env];
      }

      // Allow command line argument to override
      process.argv.forEach(function(argument) {
        var parsedArg = args(argument);

        if (
          parsedArg &&
          parsedArg.key === arg &&
          parsedArg.value
        ) {
          value = parsedArg.value;
        }
      });
    }

    // If a format is specified, apply strict validation
    if (format && !validator.validate(value, format)) {
      // Allow locale override
      validator.locale = locale || 'en-US';

      throw Error('Configuration validation failed: ' + name + ' set to "' + value + '"');
    }

    return value;
  }
};