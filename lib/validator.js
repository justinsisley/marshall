var validator = require('validator');

module.exports = {
  validate: function validate(value, format) {
    if (format instanceof Array) {
      return validator.isIn(value, format);
    }

    var isValid = true;

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

    case 'fqdn':
      isValid = validator.isFQDN(value);
      break;

    case 'float':
      isValid = validator.isFloat(value);
      break;

    case 'ip':
      isValid = validator.isIP(value);
      break;

    case 'phone':
      isValid = validator.isMobilePhone(value, this.locale || 'en-US');
      break;

    case 'number':
      isValid = validator.isNumeric(value);
      break;
    }

    return isValid;
  }
};
