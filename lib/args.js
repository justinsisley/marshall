module.exports = function(arg) {
  var regex = /^[\s|\-]*([^\s=]+)[\s|=]{1}["|']?([^\s="']+)["|']?/;
  var parsed = regex.exec(arg);

  if (!parsed) {
    return null;
  }

  return {
    key: parsed[1],
    value: parsed[2],
  };
};
