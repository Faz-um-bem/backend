const { eventLogStatus } = use('App/Models/Enums/EventsLogs');
class GetInstitutionsToAuditUseCase {
  static get inject() {
    return ['App/Models/Institution'];
  }

  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute(page) {
    const institutions = await this.institutionModel
      .query()
      .with('event_logs', (qb) => {
        qb.where({ status: eventLogStatus.underReview });
      })
      .paginate(page, 20);

    return institutions;
  }
}

module.exports = GetInstitutionsToAuditUseCase;
