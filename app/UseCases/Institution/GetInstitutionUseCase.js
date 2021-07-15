const NotFoundException = use('App/Exceptions/NotFoundException')

class GetInstitutionUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Institution'];
  }

  // Recebe dependências declaradas no inject
  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute(institutionId) {
    const institution = await this.institutionModel.find(institutionId);

    if(!institution) {
        return {success: false, data: new NotFoundException("Instituição não encontrada")};
    }

    return {success: true, data: institution};
  }
}

module.exports = GetInstitutionUseCase;
