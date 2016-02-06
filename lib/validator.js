var validator = require('validator');

function coerceToString(input) {
  if (typeof input === 'string') {
    return input;
  }

  if (input.toString) {
    return input.toString();
  }

  if (input === null || input === undefined || isNaN(input)) {
    return '';
  }

  return '' + input;
}

module.exports = {
  validate: function validate(value, format) {
    var isValid = true;

    // String coercion is necessary for validator.js to work
    var stringValue = coerceToString(value);

    switch (format) {
    case Boolean:
      isValid = typeof value === 'boolean';
      break;

    case Number:
      isValid = typeof value === 'number';
      break;

    case String:
      isValid = typeof value === 'string';
      break;

    case 'port':
      isValid = validator.isInt(stringValue, { min: 0, max: 65535 });
      break;

    case 'nat':
      isValid = validator.isInt(stringValue, { min: 0 });
      break;

    case 'url':
      isValid = validator.isURL(stringValue, { require_protocol: true });
      break;

    case 'alpha':
      isValid = validator.isAlpha(stringValue);
      break;

    case 'bool':
      isValid = validator.isBoolean(stringValue);
      break;

    case 'date':
      isValid = validator.isDate(stringValue);
      break;

    case 'email':
      isValid = validator.isEmail(stringValue);
      break;

    case 'fqdn':
      isValid = validator.isFQDN(stringValue);
      break;

    case 'float':
      isValid = validator.isFloat(stringValue);
      break;

    case 'ip':
      isValid = validator.isIP(stringValue);
      break;

    case 'phone':
      isValid = validator.isMobilePhone(stringValue, this.locale || 'en-US');
      break;

    case 'number':
      isValid = validator.isNumeric(stringValue);
      break;
    }

    return isValid;
  }
};
