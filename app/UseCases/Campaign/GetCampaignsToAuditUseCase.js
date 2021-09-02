class GetCampaignsToAuditUseCase {
  static get inject() {
    return ['App/Models/CampaignEventsLog'];
  }

  constructor(campaignEventLogModel) {
    this.campaignEventLogModel = campaignEventLogModel;
  }

  async execute(page) {
    const campaigns = await this.campaignEventLogModel
      .query()
      .where('status', 2)
      .with('campaign')
      .paginate(page, 20);

    return campaigns;
  }
}

module.exports = GetCampaignsToAuditUseCase;
