const NotFoundException = use('App/Exceptions/NotFoundException');

class GetInstitutionsUseCase {
  static get inject() {
    return ['App/Models/Institution'];
  }

  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute() {
    const institutions = await this.institutionModel.all();

    if (!institutions) {
      return { success: false, data: new NotFoundException('Nenhuma instituição encontrada') };
    }

    return { success: true, data: institutions };
  }
}

module.exports = GetInstitutionsUseCase;
