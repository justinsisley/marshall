function isNode() {
  try {
    return !!global;
  } catch (err) {
    return false;
  }
}

module.exports = {
  isNode: isNode
};