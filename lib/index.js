var Table = require('cli-table');
var parser = require('./parser');

var marshall = function marshall(config) {
  var parsedConfig = {};
  var parsedProp;
  var envConfig = {};
  var tableRows = [];

  // Iterate configuration object
  for (var prop in config) {
    if (config.hasOwnProperty(prop)) {
      if (config[prop].format) {
        // Parse each property to validate and retrieve the final value
        parsedConfig[prop] = parser.parse(prop, config[prop], marshall.locale);

        // Create an object with environment variable names as keys
        envConfig[config[prop].env] = JSON.stringify(parsedConfig[prop]);

        // Push the config to the cli table
        tableRows.push([prop, parsedConfig[prop], config[prop].doc]);
      } else {
        parsedConfig[prop] = {};

        for (var nestedProp in config[prop]) {
          if (config[prop].hasOwnProperty(nestedProp)) {
            // Parse each property to validate and retrieve the final value
            parsedConfig[prop][nestedProp] = parser.parse(
              nestedProp,
              config[prop][nestedProp],
              marshall.locale
            );

            // Create an object with environment variable names as keys
            envConfig[config[prop][nestedProp].env] = JSON.stringify(parsedConfig[prop][nestedProp]);

            // Push the config to the cli table
            tableRows.push([
              prop + '.' + nestedProp,
              parsedConfig[prop][nestedProp],
              config[prop][nestedProp].doc
            ]);
          }
        }
      }
    }
  }

  return {
    get: function get(key) {
      if (!key) {return parsedConfig;}
      return parsedConfig[key];
    },
    doc: function doc() {
      var table = new Table({
        head: ['Config', 'Value', 'Description'],
      });

      tableRows.map(row => table.push(row))

      return table.toString();
    },
    env: function env() {
      return envConfig;
    }
  };
};

// Default locale
marshall.locale = 'en-US';

module.exports = marshall;
