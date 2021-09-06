class GetInstitutionLogUseCase {
  static get inject() {
    return ['App/Models/InstitutionEventsLog'];
  }

  constructor(institutionEventsLogModel) {
    this.institutionEventsLogModel = institutionEventsLogModel;
  }

  async execute(page, institutionId, status) {
    const institutionsEventsLogQuery = this.institutionEventsLogModel
      .query()
      .clone();

    if (status)
      institutionsEventsLogQuery.where('status', status);

    institutionsEventsLogQuery.where('institution_id', institutionId);

    const institutionsEventsLog = await institutionsEventsLogQuery
      .paginate(page, 20);

    return institutionsEventsLog;
  }
}

module.exports = GetInstitutionLogUseCase;
