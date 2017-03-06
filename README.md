# marshall

[![licence mit](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/justinsisley/marshall/blob/master/LICENSE.md)

> Shared JavaScript configuration for Node.js and web apps

Marshall is heavily inspired by [convict](https://www.npmjs.com/package/convict). If you only need configuration management for a Node.js app, convict is the way to go.

## Features

- Use in any JavaScript environment
- Default values
- Environment variable overrides
- Command-line argument overrides
- Built-in documentation
- Strict validation by default

> Warning: if your server config contains sensitive data, don't share it with your web application, since your secrets will be built into your application bundle.

## Install

```bash
npm install marshall
```

## Example

An example `config.js`:

```javascript
const marshall = require('marshall');

// Configuration schema
const config = marshall({
  env: {
    doc: 'The application environment',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'node-env',
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 8743,
    env: 'PORT',
    arg: 'port',
  },
  cacheDuration: {
    doc: 'Length of time to cache static assets',
    format: 'nat',
    default: 5184000000, // 60 days
    env: 'CACHE_DURATION',
    arg: 'cache-duration',
  },
  api: {
    doc: 'The API the application communicates with',
    format: 'url',
    default: 'https://api.company.com',
    env: 'API',
    arg: 'api',
  },
});

module.exports = config;
```

### Usage

```javascript
const config = require('./config.js');

// Log a single configuration
console.log('Environment: ' + config.get('env'));
// Log all configurations
console.log('All config: ' + config.get());
// Log the current configuration details in a user-friendly format
console.log(config.doc());
// Log the current configuration details using the environment variable name as the key
console.log(config.env());

// Make use of a configuration
$.get(config.get('api') + '/users')
.done(function(allUsers) {
  console.log(allUsers);
});
```

## Command Line Overrides

Use environment variables or command line arguments to override default settings.

```bash
API=https://api.mycompany.com node my-app.js
```

or

```bash
node my-app.js -- api=https://api.mycompany.com
```

or both

```bash
DEBUG=true node my-app.js --node-env=test
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
