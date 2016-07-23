var Table = require('cli-table');
var parser = require('./lib/parser');

var marshall = function marshall(config) {
  var parsedConfig = {};
  var parsedProp;
  var envConfig = {};

  var table = new Table({
    head: ['Config', 'Value', 'Description'],
  });

  // Iterate configuration object
  for (var prop in config) {
    if (config.hasOwnProperty(prop)) {
      var propName = prop;

      if (config[prop].format) {
        // Parse each property to validate and retrieve the final value
        parsedConfig[prop] = parser.parse(prop, config[prop], marshall.locale);

        envConfig[config[prop].env] = JSON.stringify(parsedConfig[prop]);

        table.push([propName, parsedConfig[prop], config[prop].doc]);
      } else {
        parsedConfig[prop] = {};

        for (var nestedProp in config[prop]) {
          propName = prop + '.' + nestedProp;

          if (config[prop].hasOwnProperty(nestedProp)) {
            // Parse each property to validate and retrieve the final value
            parsedConfig[prop][nestedProp] = parser.parse(
              nestedProp,
              config[prop][nestedProp],
              marshall.locale
            );

            envConfig[config[prop][nestedProp].env] = JSON.stringify(parsedConfig[prop][nestedProp]);

            table.push([
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




// Handle nested configs
// if (!value) {
//   nestedValues = {};
//
//   for (var prop in config) {
//     if (config.hasOwnProperty(prop)) {
//       nestedValues[prop] = parser(name, config[prop], locale);
//     }
//   }
//
//   return nestedValues;
// }