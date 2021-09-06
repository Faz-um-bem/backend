class GetCuratorLogUseCase {
  static get inject() {
    return ['App/Models/CuratorEventsLog'];
  }

  constructor(curatorEventsLogModel) {
    this.curatorEventsLogModel = curatorEventsLogModel;
  }

  async execute(page, curatorId, status) {
    const curatorsEventsLogQuery = this.curatorEventsLogModel
      .query()
      .clone();

    if (status)
      curatorsEventsLogQuery.where('status', status);

    curatorsEventsLogQuery.where('curator_id', curatorId);

    const curatorsEventsLog = await curatorsEventsLogQuery
      .paginate(page, 20);

    return curatorsEventsLog;
  }
}

module.exports = GetCuratorLogUseCase;
