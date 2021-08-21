const NotFoundException = use('App/Exceptions/NotFoundException');

class GetCampaignsBySlugUseCase {
  static get inject() {
    return ['App/Models/Campaign', 'App/Models/Institution'];
  }

  constructor(campaignModel, institutionModel) {
    this.campaignModel = campaignModel;
    this.institutionModel = institutionModel;
  }

  async execute(requestData) {
    const campaign = await this.campaignModel.findBy('slug', requestData.slug);

    if (!campaign) {
      return { success: false, data: new NotFoundException('Campanha não encontrada') };
    }

    return { success: true, data: campaign };
  }
}

module.exports = GetCampaignsBySlugUseCase;
