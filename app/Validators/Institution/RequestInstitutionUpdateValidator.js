const BaseValidator = require('../BaseValidator');

class RequestInstitutionUpdateValidator extends BaseValidator {
  get rules() {
    return {
      email: 'required|email|string',
      name: 'required|string',
      corporate_name: 'required|string',
      cnpj: 'required|length:14|string|cnpj',
      description: 'required|string',
      address: 'required|string',
      address_number: 'required|string',
      address_complement: 'string',
      neighborhood: 'required|string',
      postal_code: 'required|length:8|string|onlyDigits',
      city: 'required|string',
      state: 'required|length:2',
      address_latitude: 'required|string',
      address_longitude: 'required|string',
      main_phone: 'required|string|length:11|onlyDigits',
      secondary_phone: 'string|length:11|onlyDigits',
      whatsapp_phone: 'string|length:11|onlyDigits',
      'file.value': 'string',
      'file.size': 'requiredIf:file.value|integer',
      'file.type': 'requiredIf:file.value|string',
      'file.name': 'requiredIf:file.value|string',
    };
  }

  get messages() {
    return {
      'email.required': 'E-mail é obrigatório',
      'email.email': 'E-mail inválido',
      'email.unique': 'E-mail já registrado',

      'name.required': 'Nome é obrigatório',

      'corporate_name.required': 'Razão social é obrigatória',

      'cnpj.required': 'CNPJ é obrigatório',
      'cnpj.length': 'CNPJ precisa ter {{argument.0}} dígitos',
      'cnpj.cnpj': 'CNPJ inválido',
      'cnpj.unique': 'CNPJ já registrado',

      'description.required': 'Descrição é obrigatório',

      'address.required': 'Endereço é obrigatório',

      'address_number.required': 'Número de endereço é obrigatório',

      'neighborhood.required': 'Bairro é obrigatório',

      'postal_code.required': 'CEP é obrigatório',
      'postal_code.length': 'CEP precisa ter {{argument.0}} dígitos',
      'postal_code.onlyDigits': 'Apenas dígitos são aceitos no CEP',

      'city.required': 'Cidade é obrigatório',

      'state.required': 'Estado é obrigatório',
      'state.length': 'Estado precisa ter 2 letras',

      'address_latitude.required': 'Latitude do endereço é obrigatório',

      'address_longitude.required': 'Longitude do endereço é obrigatório',

      'main_phone.required': 'Telefone principal é obrigatório',
      'main_phone.length': 'Telefone principal deve ter {{argument.0}} dígitos',
      'main_phone.onlyDigits': 'Apenas dígitos são aceitos no número de telefone principal',

      'secondary_phone.required': 'Telefone secundário é obrigatório',
      'secondary_phone.length': 'Telefone secundário deve ter {{argument.0}} dígitos',
      'secondary_phone.onlyDigits': 'Apenas dígitos são aceitos no número de telefone secundário',

      'whatsapp_phone.required': 'Telefone do What\'sApp é obrigatório',
      'whatsapp_phone.length': 'Telefone do What\'sApp deve ter {{argument.0}} dígitos',
      'whatsapp_phone.onlyDigits': 'Apenas dígitos são aceitos no número de telefone do What\'sApp',

      'file.size.requiredIf': 'Necessário informar o tamanho do arquivo',
      'file.size.integer': 'Tamanho do arquivo deve ser um número inteiro',

      'file.name.requiredIf': 'Necessário informar o nome do arquivo',

      'file.type.requiredIf': 'Necessário informar o tipo do arquivo',
    };
  }
}

module.exports = RequestInstitutionUpdateValidator;
