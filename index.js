var validator = require('validator');

function parseConfigProp(name, config) {
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
  if (format) {
    if (format instanceof Array) {
      isValid = validator.isIn(value, format);
    } else {
      switch (format) {
      case Boolean:
        isValid = typeof value === Boolean;
        break;

      case Number:
        isValid = typeof value === Number;
        break;

      case String:
        isValid = typeof value === String;
        break;

      case 'port':
        isValid = validator.isInt(value, { min: 0, max: 65535 });
        break;

      case 'nat':
        isValid = validator.isInt(value, { min: 0 });
        break;

      case 'url':
        isValid = validator.isURL(value, { require_protocol: true });
        break;

      case 'alpha':
        isValid = validator.isAlpha(value);
        break;

      case 'bool':
        isValid = validator.isBoolean(value);
        break;

      case 'date':
        isValid = validator.isDate(value);
        break;

      case 'email':
        isValid = validator.isEmail(value);
        break;

      case 'float':
        isValid = validator.isFloat(value);
        break;

      case 'ip':
        isValid = validator.isIP(value);
        break;

      case 'phone':
        isValid = validator.isMobilePhone(value, marshall.locale);
        break;

      case 'number':
        isValid = validator.isNumeric(value);
        break;
      }
    }
  }

  if (!isValid) {
    throw Error('Configuration validation failed: ' + name + ' set to "' + value + '"');
  }

  return {
    name: name,
    value: value
  };
}

var marshall = function marshall(config) {
  var parsedConfig = {};
  var parsedProp;

  for (var prop in config) {
    if (config.hasOwnProperty(prop)) {
      parsedProp = parseConfigProp(prop, config[prop]);
      parsedConfig[parsedProp.name] = parsedProp.value;
    }
  }

  return {
    get: function get(key) {
      return parsedConfig[key];
    }
  };
};

// Set default locale
marshall.locale = 'en-US';

module.exports = marshall;
