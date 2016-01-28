var validator = require('./validator');

module.exports = {
  parse: function parser(name, config, locale) {
    var value = config.default;
    var format = config.format;
    var env = config.env;
    var arg = config.arg;

    // Allow environment variable to override
    // NOTE: We're defensive here because we may be in a browser environment,
    // where `process` doesn't exist in the global scope
    if (env && process && process.env && process.env[env]) {
      value = process.env[env];
    }

    // Allow command line argument to override
    // NOTE: It would be more ideal to use a 3rd-party library for this, but the
    // aim is to keep this library as small as possible
    if (process && process.argv && process.argv instanceof Array) {
      process.argv.forEach(function(argument) {
        if (argument.indexOf(arg) > -1) {
          var split = argument.split('=');
          value = split[1];
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