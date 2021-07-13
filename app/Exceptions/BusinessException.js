const { LogicalException } = require('@adonisjs/generic-exceptions');

class BusinessException extends LogicalException {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BusinessException;
