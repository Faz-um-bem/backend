const BaseValidator = require('../BaseValidator');

class RefreshTokenValidator extends BaseValidator {
  get rules() {
    return {
      id: 'required|integer',
      refreshToken: 'required|string|uuid',
      type: 'required|in:curator,institution',
    };
  }

  get messages() {
    return {
      'id.required': 'ID é obrigatório',
      'id.integer': 'ID deve ser um número',

      'refreshToken.required': 'Token de recuperação é obrigatório',
      'refreshToken.uuid': 'Token inválido',

      'type.required': 'Tipo de conta é obrigatório',
      'type.in': 'Tipo de conta precisa ser Curador ou Instituição',
    };
  }
}

module.exports = RefreshTokenValidator;
