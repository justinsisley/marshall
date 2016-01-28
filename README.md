# Marshall

[![licence mit](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/justinsisley/marshall/blob/master/LICENSE.md)

> Shared JavaScript configuration for Node.js and web apps

Marshall is very heavily inspired by [convict](https://www.npmjs.com/package/convict). If you only need configuration management for a Node.js app, convict is the way to go.

- Small footprint
- Use in any JavaScript environment
- Override default values with environment variables and command line arguments
- Built-in documentation
- Strict validation by default

## Install

`npm install marshall`

## Example

An example `config.js`:

```

var marshall = require('marshall');

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

```

### Usage

```

var config = require('./config.js');

console.log('Environment: ' + config.get('env'));

$.get(config.get('api') + '/users')
.done(function(allUsers) {
  console.log(allUsers);
});

```

## Validation

Validation is provided by [validator](https://github.com/chriso/validator.js).

Built-in validations:

- `Boolean` - value must be `typeof Boolean`
- `Number` - value must be `typeof Number`
- `String` - value must be `typeof String`
- `port` - value must be a number between 0 and 65535
- `nat` - value must be a natural number
- `url` - value must be a URL
- `alpha` - value must contain only alphabetical characters
- `bool` - value must be `true` or `false`
- `date` - value must be a date
- `email` - value must be an email address
- `float` - value must be a floating point number
- `ip` -  value must be an IP address
- `phone` - value must be a phone number (configurable locale)
- `number` - value must be a number

## Versioning

To keep better organization of releases this project follows the [Semantic Versioning 2.0.0](http://semver.org/) guidelines.

## Contributing
Want to contribute? [Follow these recommendations](https://github.com/justinsisley/marshall/blob/master/CONTRIBUTING.md).

## License
[MIT License](https://github.com/justinsisley/marshall/blob/master/LICENSE.md) © [Justin Sisley](http://justinsisley.com/)
