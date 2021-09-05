const { institutionStatus } = use('App/Models/Enums/Institution');

class GetInstitutionsCoordinatesUseCase {
  static get inject() {
    return ['App/Models/Institution'];
  }

  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  execute() {
    return this.institutionModel
      .query()
      .select(['id', 'name', 'slug', 'address_latitude', 'address_longitude'])
      .where({
        status: institutionStatus.approved,
      })
      .fetch();
  }
}

module.exports = GetInstitutionsCoordinatesUseCase;
