const NotFoundException = use('App/Exceptions/NotFoundException');

class GetCampaignUseCase {
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

    const campaign = await this.campaignModel.find(request.campaign_id);

    if (!campaign || campaign.institution_id !== institution.id) {
      return { success: false, data: new NotFoundException('Campanha não encontrada') };
    }

    await campaign.load('tags.tag');

    return { success: true, data: campaign };
  }
}

module.exports = GetCampaignUseCase;
