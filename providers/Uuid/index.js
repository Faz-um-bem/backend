const uuid = require('uuid');

class UuidProvider {
  create() {
    return uuid.v4();
  }

  validate(id) {
    return uuid.validate(id);
  }
}

module.exports = UuidProvider;
