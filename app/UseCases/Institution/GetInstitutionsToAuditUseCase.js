class GetInstitutionsToAuditUseCase {
  static get inject() {
    return ['App/Models/InstitutionEventsLog'];
  }

  constructor(institutionEventLogModel) {
    this.institutionEventLogModel = institutionEventLogModel;
  }

  async execute(page) {
    const institutions = await this.institutionEventLogModel
      .query()
      .where('status', 2)
      .with('institution')
      .paginate(page, 20);

    return institutions;
  }
}

module.exports = GetInstitutionsToAuditUseCase;
