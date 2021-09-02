const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

class GetCampaignsToAuditUseCase {
  static get inject() {
    return ['App/Models/Campaign'];
  }

  constructor(campaignModel) {
    this.campaignModel = campaignModel;
  }

  async execute(page, title, status) {
    const campaignsQuery = this.campaignModel
      .query()
      .clone();

    if (title)
      campaignsQuery.where('title', 'like', `%${title}%`);

    if (status)
      campaignsQuery.where('status', status);

    const campaigns = await campaignsQuery
      .with('event_logs', (qb) => {
        qb.where('status', eventLogStatus.underReview);
      })
      .paginate(page, 20);

    return campaigns;
  }
}

module.exports = GetCampaignsToAuditUseCase;
