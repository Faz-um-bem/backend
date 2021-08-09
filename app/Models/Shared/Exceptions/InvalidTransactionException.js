const { LogicalException } = require('@adonisjs/generic-exceptions');

class InvalidTransactionException extends LogicalException {
  constructor() {
    super('Invalid transaction! This error may occur if you forgot to open a transaction before executing a operation on it', 500);
  }
}

module.exports = InvalidTransactionException;
