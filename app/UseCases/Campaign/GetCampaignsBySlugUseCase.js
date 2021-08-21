const NotFoundException = use('App/Exceptions/NotFoundException');

class GetCampaignsBySlugUseCase {
  static get inject() {
    return ['App/Models/Campaign', 'App/Models/Institution'];
  }

  constructor(campaignModel, institutionModel) {
    this.campaignModel = campaignModel;
    this.institutionModel = institutionModel;
  }

  async execute(request) {
    const institution = await this.institutionModel.find(request.id);

    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não encontrada') };
    }

    const campaign = await this.campaignModel.findBy('slug', request.slug);

    if (!campaign) {
      return { success: false, data: new NotFoundException('Campanha não encontrada') };
    }

    return { success: true, data: campaign };
  }
}

module.exports = GetCampaignsBySlugUseCase;
