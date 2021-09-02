const NotFoundException = use('App/Exceptions/NotFoundException');
const GenericException = use('App/Exceptions/GenericException');

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

  async execute({ institutionId, photoId }) {
    const institution = await this.institutionModel.query().select(['id']).where({ id: institutionId }).first();
    if (!institution)
      return { success: false, data: new NotFoundException('Instituição não encontrada') };

    const institutionPhoto = await this.institutionPhotoModel.find(photoId);
    if (!institutionPhoto)
      return { success: false, data: new NotFoundException('Foto não encontrada') };

    const deletedPhoto = await this.fileStorageProvider
      .deleteFile({ path: institutionPhoto.url });

    if (!deletedPhoto.success)
      return { success: false, data: new GenericException(deletedPhoto.data) };

    return { success: true, data: 'Foto deletada com sucesso' };
  }
}

module.exports = DeletePhotoUseCase;
