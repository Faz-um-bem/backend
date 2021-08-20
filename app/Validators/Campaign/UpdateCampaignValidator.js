const BaseValidator = require('../BaseValidator');

class UpdateCampaignValidator extends BaseValidator {
  get rules() {
    return {
      title: 'string',
      description: 'string',
      address: 'string',
      address_number: 'string',
      address_complement: 'string',
      neighborhood: 'string',
      postal_code: 'length:8|string|onlyDigits',
      state: 'length:2',
      city: 'string',
      address_latitude: 'string',
      address_longitude: 'string',
    };
  }

  get messages() {
    return {
      'postal_code.length': 'CEP precisa ter {{argument.0}} dígitos',
      'postal_code.onlyDigits': 'Apenas dígitos são aceitos no CEP',

      'state.length': 'Estado precisa ter 2 letras',
    };
  }
}

module.exports = UpdateCampaignValidator;
