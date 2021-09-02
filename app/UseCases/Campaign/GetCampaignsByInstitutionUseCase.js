class GetCampaignsByInstitutionUseCase {
  static get inject() {
    return ['App/Models/Campaign'];
  }

  constructor(campaignModel) {
    this.campaignModel = campaignModel;
  }

  async execute(institutionId) {
    const campaigns = await this.campaignModel
      .query()
      .where('institution_id', '=', institutionId)
      .with('tags.tag')
      .fetch();

    return { success: true, data: campaigns };
  }
}

module.exports = GetCampaignsByInstitutionUseCase;
