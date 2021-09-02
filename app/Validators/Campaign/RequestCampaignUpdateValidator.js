const BaseValidator = require('../BaseValidator');

class RequestCampaignUpdateValidator extends BaseValidator {
  get rules() {
    return {
      title: 'required|string',
      description: 'required|string',
      address: 'required|string',
      address_number: 'required|string',
      address_complement: 'required|string',
      neighborhood: 'required|string',
      postal_code: 'required|length:8|string|onlyDigits',
      state: 'required|length:2',
      city: 'required|string',
      address_latitude: 'required|string',
      address_longitude: 'required|string',
    };
  }

  get messages() {
    return {
      'title.required': 'Título é obrigatório',

      'description.required': 'Descrição é obrigatória',

      'address.required': 'Endereço é obrigatório',

      'address_number.required': 'Número de endereço é obrigatório',

      'address_complement.required': 'Complemento do endereço é obrigatório',

      'neighborhood.required': 'Bairro é obrigatório',

      'postal_code.required': 'CEP é obrigatório',
      'postal_code.length': 'CEP precisa ter {{argument.0}} dígitos',
      'postal_code.onlyDigits': 'Apenas dígitos são aceitos no CEP',

      'state.required': 'Estado é obrigatório',
      'state.length': 'Estado precisa ter 2 letras',

      'city.required': 'Cidade é obrigatório',

      'address_latitude.required': 'Latitude do endereço é obrigatório',

      'address_longitude.required': 'Longitude do endereço é obrigatório',
    };
  }
}

module.exports = RequestCampaignUpdateValidator;