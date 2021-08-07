const NotFoundException = use('App/Exceptions/NotFoundException');

class GetCampaignsByInstitutionUseCase {
  static get inject() {
    return ['App/Models/Campaign', 'App/Models/Institution'];
  }

  constructor(campaignModel, institutionModel) {
    this.campaignModel = campaignModel;
    this.institutionModel = institutionModel;
  }

  async execute(institutionId) {
    const institution = await this.institutionModel.find(institutionId);

    // Verifica se a instituição existe
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não encontrada') };
    }

    const campaigns = await this.campaignModel
      .query()
      .where('referred_institution', '=', institutionId)
      .fetch();

    // Verifica se a instituição possui campanha
    if (!campaigns.rows.length) {
      return { success: false, data: new NotFoundException('Nenhuma campanha encontrada') };
    }

    return { success: true, data: campaigns };
  }
}

module.exports = GetCampaignsByInstitutionUseCase;
