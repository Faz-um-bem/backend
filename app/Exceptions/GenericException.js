const { LogicalException } = require('@adonisjs/generic-exceptions');

class GenericException extends LogicalException {
  constructor(message) {
    super(message, 500);
  }
}

module.exports = GenericException;
