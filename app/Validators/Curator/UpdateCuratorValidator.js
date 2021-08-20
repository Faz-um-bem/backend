const BaseValidator = require('../BaseValidator');

class UpdateCuratorValidator extends BaseValidator {
  get rules() {
    return {
      name: 'required|string',
      email: 'required|email',
      password: 'min:6|confirmed|string',
      admin: 'required|boolean',
    };
  }

  get messages() {
    return {
      'name.required': 'Nome é obrigatório',

      'email.required': 'Email é obrigatório',

      'password.min': 'Senha precisa ter no mínimo {{argument.0}} caractéres',
      'password.confirmed': 'Senha e confirmação de senha não são iguais',

      'admin.required': 'Campo admin é obrigatório',
      'admin.boolean': 'O valor deve ser um booleano',
    };
  }
}

module.exports = UpdateCuratorValidator;
