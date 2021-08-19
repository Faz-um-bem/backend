const BaseValidator = require('../BaseValidator');

class LoginValidator extends BaseValidator {
  get rules() {
    return {
      email: 'required|email|string',
      password: 'required|string',
    };
  }

  get messages() {
    return {
      'email.required': 'E-mail é obrigatório',
      'email.email': 'E-mail inválido',

      'password.required': 'Senha é obrigatória',
    };
  }
}

module.exports = LoginValidator;
