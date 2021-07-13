const { LogicalException } = require('@adonisjs/generic-exceptions');

class UnauthorizedException extends LogicalException {
  constructor(message) {
    super(message || 'Você não tem permissão para acessar esse recurso', 403);
  }
}

module.exports = UnauthorizedException;
