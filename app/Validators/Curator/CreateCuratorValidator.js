const BaseValidator = require('../BaseValidator');

class CreateCuratorValidator extends BaseValidator {
  get rules() {
    return {
      name: 'required|string',
      email: 'required|email|string|unique:curators',
      password: 'required|min:6|confirmed|string',
      admin: 'required|boolean',
    };
  }

  get messages() {
    return {
      'name.required': 'Nome é obrigatório',

      'email.required': 'E-mail é obrigatório',
      'email.email': 'E-mail inválido',
      'email.unique': 'E-mail já registrado',

      'password.required': 'Senha é obrigatória',
      'password.min': 'Senha precisa ter no mínimo {{argument.0}} caractéres',
      'password.confirmed': 'Senha e confirmação de senha não são iguais',

      'admin.required': 'Campo admin é obrigatório',
      'admin.boolean': 'O valor deve ser um booleano',
    };
  }
}

module.exports = CreateCuratorValidator;
