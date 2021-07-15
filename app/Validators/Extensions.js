const Validator = use('Validator');
const { cpf: cpfValidator, cnpj: cnpjValidator } = require('cpf-cnpj-validator');

class ValidatorExtension {
  static registerValidations() {
    Validator.extend('length', this.validateStringLength);
    Validator.extend('cpf', this.validateCpf);
    Validator.extend('cnpj', this.validateCnpj);
    Validator.extend('onlyDigits', this.validateStringOnlyDigits);
  }

  static async validateStringLength(data, field, message, args, get) {
    const string = get(data, field);

    if (!string) return;

    const [length] = args;

    if (string.length !== Number(length)) throw message;
  }

  static async validateCpf(data, field, message, args, get) {
    const cpf = get(data, field);

    if (!cpf) return;

    if (!cpfValidator.isValid(cpf)) throw message;
  }

  static async validateCnpj(data, field, message, args, get) {
    const cnpj = get(data, field);

    if (!cnpj) return;

    if (!cnpjValidator.isValid(cnpj)) throw message;
  }

  static async validateStringOnlyDigits(data, field, message, args, get) {
    const value = get(data, field);

    if (!value) return;

    const regex = new RegExp(/^[0-9]+$/);

    if (!regex.test(value)) throw message;
  }
}

module.exports = ValidatorExtension;
