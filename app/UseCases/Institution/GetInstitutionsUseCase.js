class GetInstitutionsUseCase {
  static get inject() {
    return ['App/Models/Institution'];
  }

  constructor(institutionModel) {
    this.institutionModel = institutionModel;
  }

  async execute(page) {
    const institutions = await this.institutionModel.paginate(page, 10);

    return { success: true, data: institutions };
  }
}

module.exports = GetInstitutionsUseCase;
