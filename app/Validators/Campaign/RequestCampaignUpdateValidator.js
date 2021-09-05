const BaseValidator = require('../BaseValidator');

class RequestCampaignUpdateValidator extends BaseValidator {
  get rules() {
    return {
      title: 'required|string',
      description: 'required|string',
      address: 'required|string',
      address_number: 'required|string',
      address_complement: 'string',
      neighborhood: 'required|string',
      postal_code: 'required|length:8|string|onlyDigits',
      state: 'required|length:2',
      city: 'required|string',
      address_latitude: 'required|string',
      address_longitude: 'required|string',
      'file.value': 'string',
      'file.size': 'requiredIf:file.value|integer',
      'file.type': 'requiredIf:file.value|string',
      'file.name': 'requiredIf:file.value|string',
    };
  }

  get messages() {
    return {
      'title.required': 'Título é obrigatório',

      'description.required': 'Descrição é obrigatória',

      'address.required': 'Endereço é obrigatório',

      'address_number.required': 'Número de endereço é obrigatório',

      'neighborhood.required': 'Bairro é obrigatório',

      'postal_code.required': 'CEP é obrigatório',
      'postal_code.length': 'CEP precisa ter {{argument.0}} dígitos',
      'postal_code.onlyDigits': 'Apenas dígitos são aceitos no CEP',

      'state.required': 'Estado é obrigatório',
      'state.length': 'Estado precisa ter 2 letras',

      'city.required': 'Cidade é obrigatório',

      'address_latitude.required': 'Latitude do endereço é obrigatório',

      'address_longitude.required': 'Longitude do endereço é obrigatório',

      'file.size.requiredIf': 'Necessário informar o tamanho do arquivo',
      'file.size.integer': 'Tamanho do arquivo deve ser um número inteiro',

      'file.name.requiredIf': 'Necessário informar o nome do arquivo',

      'file.type.requiredIf': 'Necessário informar o tipo do arquivo',
    };
  }
}

module.exports = RequestCampaignUpdateValidator;
