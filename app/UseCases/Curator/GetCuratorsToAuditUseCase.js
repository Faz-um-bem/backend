const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

class GetCuratorsToAuditUseCase {
  static get inject() {
    return ['App/Models/Curator'];
  }

  constructor(curatorModel) {
    this.curatorModel = curatorModel;
  }

  async execute(page, name) {
    const curatorsQuery = this.curatorModel
      .query()
      .clone();

    if (name)
      curatorsQuery.where('name', 'like', `%${name}%`);

    const curators = await curatorsQuery
      .with('event_logs', (qb) => {
        qb.where('status', eventLogStatus.underReview);
      })
      .paginate(page, 20);

    return curators;
  }
}

module.exports = GetCuratorsToAuditUseCase;
