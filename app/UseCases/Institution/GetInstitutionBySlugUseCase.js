const NotFoundException = use('App/Exceptions/NotFoundException');

class GetInstitutionBySlugUseCase {
  static get inject() {
    return ['App/Models/Institution'];
  }

  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute(requestData) {
    const institution = await this.institutionModel.findBy('slug', requestData.slug);

    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não encontrada') };
    }

    return { success: true, data: institution };
  }
}

module.exports = GetInstitutionBySlugUseCase;
