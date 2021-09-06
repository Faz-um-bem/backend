const BaseValidator = require('../BaseValidator');

class UpdatePasswordValidator extends BaseValidator {
  get rules() {
    return {
      password: 'required|string',
      new_password: 'required|string|confirmed|min:6|different:password',
      type: 'string|in:curator,institution',
    };
  }

  get messages() {
    return {
      'password.required': 'Senha atual é obrigatória',

      'new_password.required': 'Nova senha é obrigatória',
      'new_password.confirmed': 'Nova senha não confere',
      'new_password.min': 'Senha precisa ter no mínimo {{argument.0}} caractéres',
      'new_password.different': 'Nova senha precisa ser diferente da antiga',

      'type.required': 'Tipo de conta é obrigatório',
      'type.in': 'Tipo de conta precisa ser Curador ou Instituição',
    };
  }
}

module.exports = UpdatePasswordValidator;
