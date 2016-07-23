const config = require('./config');

console.log(config.get('env') + '\n');
console.log(config.get('nested').example + '\n');
console.log(config.get());
console.log(config.doc());
console.log(config.env());