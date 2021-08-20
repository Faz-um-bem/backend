const NotFoundException = use('App/Exceptions/NotFoundException');

class GetCampaignsUseCase {
  static get inject() {
    return ['App/Models/Campaign'];
  }

  constructor(campaignModel) {
    this.campaignModel = campaignModel;
  }

  async execute() {
    const campaigns = await this.campaignModel.all();

    if (!campaigns) {
      return { success: false, data: new NotFoundException('Nenhuma campanha encontrada') };
    }

    return { success: true, data: campaigns };
  }
}

module.exports = GetCampaignsUseCase;
