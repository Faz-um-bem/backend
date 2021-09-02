const Config = use('Config');
const UploadHelper = use('App/Helpers/Upload');
const NotFoundException = use('App/Exceptions/NotFoundException');
const BusinessException = use('App/Exceptions/BusinessException');
const GenericException = use('App/Exceptions/GenericException');

class UploadPhotoUseCase {
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

  async execute({ institutionId, photo }) {
    const institution = await this.institutionModel.query().select(['id']).where({ id: institutionId }).first();
    if (!institution)
      return { success: false, data: new NotFoundException('Instituição não encontrada') };

    const institutionPhotosCount = await this.institutionPhotoModel
      .query()
      .where({ institution_id: institutionId })
      .getCount();

    if (Number(institutionPhotosCount) === Config.get('files.maxPhotoAmount'))
      return { success: false, data: new BusinessException('Limite de imagens por instituição atingido') };

    const photoDateTime = Date.now();

    try {
      const photoPath = await this.savePhoto(photo, photoDateTime);

      const institutionPhoto = await this.institutionPhotoModel.create({
        institution_id: institutionId,
        url: photoPath,
      });

      return { success: true, data: institutionPhoto };
    } catch (error) {
      await this.deletePhoto(photo, photoDateTime);

      throw error;
    }
  }

  async savePhoto(file, photoDateTime) {
    if (!file)
      return { success: true, path: null };

    const allowedTypes = Config.get('files.allowedTypes');
    if (!allowedTypes.has(file.type))
      return { success: false, message: 'Tipo de arquivo não suportado' };

    const maxSize = Config.get('files.maxSize');
    if (maxSize < file.size)
      return { success: false, message: `Tamanho maximo do foto deve ser de ${maxSize}` };

    const photo = await this.fileStorageProvider
      .saveFile({ file: file.value, path: `${UploadHelper.getInstitutionUploadPath()}/${photoDateTime}-${file.name}` });

    if (!photo.success)
      throw new GenericException('Erro ao salvar foto');

    return photo.path;
  }

  deletePhoto(file, photoDateTime) {
    if (!file)
      return null;

    return this.fileStorageProvider
      .deleteFile({ path: `${UploadHelper.getInstitutionUploadPath()}/${photoDateTime}-${file.name}` });
  }
}

module.exports = UploadPhotoUseCase;
