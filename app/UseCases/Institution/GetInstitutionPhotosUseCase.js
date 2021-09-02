class GetInstitutionPhotosUseCase {
  static get inject() {
    return ['App/Models/InstitutionPhoto'];
  }

  constructor(institutionPhotoModel) {
    this.institutionPhotoModel = institutionPhotoModel;
  }

  execute(page, institutionId) {
    return this.institutionPhotoModel.paginate(page, 20, { institution_id: institutionId });
  }
}

module.exports = GetInstitutionPhotosUseCase;
