const { institutionStatus } = use('App/Models/Enums/Institution');

class CreateInstitutionUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Institution'];
  }

  // Recebe dependências declaradas no inject
  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute(institutionData) {
    const institution = await this.institutionModel.create(
      { ...institutionData, status: institutionStatus.underReview },
    );

    // TODO Criar notificação de criação de instituicao

    return institution;
  }
}

module.exports = CreateInstitutionUseCase;
