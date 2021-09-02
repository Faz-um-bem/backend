class DeletePhotoUseCase {
  static get inject() {
    return [
      'App/Models/Institution',
      'App/Models/InstitutionPhoto',
      'FileStorage',
    ];
  }

  constructor(institutionModel, institutionPhotoModel, fileStorageProvider) {
    this.institutionModel = institutionModel;
    this.institutionPhotoModel = institutionPhotoModel;
    this.fileStorageProvider = fileStorageProvider;
  }

  // async execute({}) {

  // }
}

module.exports = DeletePhotoUseCase;
