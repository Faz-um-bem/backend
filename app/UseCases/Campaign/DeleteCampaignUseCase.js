const NotFoundException = use('App/Exceptions/NotFoundException');

class DeleteCampaignUseCase {
  static get inject() {
    return ['App/Models/Campaign'];
  }

  constructor(campaignModel) {
    this.campaignModel = campaignModel;
  }

  async execute(campaignData) {
    const campaign = await this.campaignModel.find(campaignData.campaign_id);
    if (!campaign) {
      return { success: false, data: new NotFoundException('Campanha não existente') };
    }

    if (Number(campaignData.id) !== campaign.institution_id) {
      return { success: false, data: new NotFoundException('A campanha não pertence à esta instituição') };
    }

    await campaign.delete();

    return { success: true, data: null };
  }
}

module.exports = DeleteCampaignUseCase;
