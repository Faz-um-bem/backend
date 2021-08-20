const NotFoundException = use('App/Exceptions/NotFoundException');

class DeleteInstitutionUseCase {
  static get inject() {
    return ['App/Models/Institution'];
  }

  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute(institutionData) {
    const institution = await this.institutionModel.find(institutionData.id);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não encontrada') };
    }

    await institution.delete();

    return { success: true, data: null };
  }
}

module.exports = DeleteInstitutionUseCase;
