const { LogicalException } = require('@adonisjs/generic-exceptions');

class NotFoundException extends LogicalException {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundException;
