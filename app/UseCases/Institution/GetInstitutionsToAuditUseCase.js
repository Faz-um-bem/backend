const { eventLogStatus } = use('App/Models/Enums/EventsLogs');
class GetInstitutionsToAuditUseCase {
  static get inject() {
    return ['App/Models/Institution'];
  }

  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute(page, name, status) {
    const institutionsQuery = this.institutionModel
      .query()
      .clone();

    if (name) {
      institutionsQuery.where('name', 'like', `%${name}%`);
    }

    if (status) {
      institutionsQuery.where('status', status);
    }

    const institutions = await institutionsQuery
      .with('event_logs', (qb) => {
        qb.where({ status: eventLogStatus.underReview });
      })
      .paginate(page, 20);

    return institutions;
  }
}

module.exports = GetInstitutionsToAuditUseCase;
