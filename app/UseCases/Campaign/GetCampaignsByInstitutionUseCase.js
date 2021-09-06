class GetCampaignsByInstitutionUseCase {
  static get inject() {
    return ['App/Models/Campaign'];
  }

  constructor(campaignModel) {
    this.campaignModel = campaignModel;
  }

  async execute(page, institutionId, title, status) {
    const campaignsQuery = this.campaignModel
      .query()
      .clone();
    if (title)
      campaignsQuery.where('title', 'like', `%${title}%`);

    if (status)
      campaignsQuery.where('status', status);

    campaignsQuery.where('institution_id', institutionId);

    const campaigns = await campaignsQuery
      .with('tags.tag')
      .paginate(page, 20);

    return campaigns;
  }
}

module.exports = GetCampaignsByInstitutionUseCase;
