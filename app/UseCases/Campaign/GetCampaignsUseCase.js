class GetCampaignsUseCase {
  static get inject() {
    return ['App/Models/Campaign'];
  }

  constructor(campaignModel) {
    this.campaignModel = campaignModel;
  }

  async execute(page) {
    const campaigns = await this.campaignModel.query().with('tags.tag').paginate(page, 10);

    return { success: true, data: campaigns };
  }
}

module.exports = GetCampaignsUseCase;
