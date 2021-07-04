class CreateInstitutionUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Institution'];
  }

  // Recebe dependências declaradas no inject
  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute() {
    throw new Error('Use case not implemented');
  }
}

module.exports = CreateInstitutionUseCase;
