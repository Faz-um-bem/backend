class GetCampaignLogUseCase {
  static get inject() {
    return ['App/Models/CampaignEventsLog'];
  }

  constructor(campaignEventsLogModel) {
    this.campaignEventsLogModel = campaignEventsLogModel;
  }

  async execute(page, campaignId, status) {
    const campaignsEventsLogQuery = this.campaignEventsLogModel
      .query()
      .clone();

    if (status)
      campaignsEventsLogQuery.where('status', status);

    campaignsEventsLogQuery.where('campaign_id', campaignId);

    const campaignsEventsLog = await campaignsEventsLogQuery
      .paginate(page, 20);

    return campaignsEventsLog;
  }
}

module.exports = GetCampaignLogUseCase;
