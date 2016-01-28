var validator = require('./validator');

module.exports = {
  parse: function parser(name, config, locale) {
    var value = config.default;
    var format = config.format;
    var env = config.env;
    var arg = config.arg;

    // Allow environment variable to override
    if (env && process && process.env && process.env[env]) {
      value = process.env[env];
    }

    // Allow command line argument to override
    process.argv.forEach(function(argument) {
      if (argument.indexOf(arg) > -1) {
        var split = argument.split('=');
        value = split[1];
      }
    });

    // Validation
    var isValid = true;

    // Allow locale override
    validator.locale = locale || 'en-US';

    // If a format is specified, apply strict validation
    if (format) {
      isValid = validator.validate(value, format);
    }

    // Fail on invalid configuration
    if (!isValid) {
      throw Error('Configuration validation failed: ' + name + ' set to "' + value + '"');
    }

    return {
      name: name,
      value: value
    };
  }
};