const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

class GetCampaignsToAuditUseCase {
  static get inject() {
    return ['App/Models/Campaign'];
  }

  constructor(campaignModel) {
    this.campaignModel = campaignModel;
  }

  async execute(page) {
    const campaigns = await this.campaignModel
      .query()
      .where('status', 2)
      .with('event_logs', (qb) => {
        qb.where('status', eventLogStatus.underReview);
      })
      .paginate(page, 20);

    return campaigns;
  }
}

module.exports = GetCampaignsToAuditUseCase;
