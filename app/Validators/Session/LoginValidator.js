const BaseValidator = require('../BaseValidator');

class LoginValidator extends BaseValidator {
  get rules() {
    return {
      email: 'required|email|string',
      password: 'required|string',
      type: 'required|in:curator,institution',
    };
  }

  get messages() {
    return {
      'email.required': 'E-mail é obrigatório',
      'email.email': 'E-mail inválido',

      'password.required': 'Senha é obrigatória',

      'type.required': 'Tipo de conta é obrigatório',
      'type.in': 'Tipo de conta precisa ser Curador ou Instituição',
    };
  }
}

module.exports = LoginValidator;
