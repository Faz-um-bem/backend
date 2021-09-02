const Config = use('Config');
const UploadHelper = use('App/Helpers/Upload');
const NotFoundException = use('App/Exceptions/NotFoundException');
const BusinessException = use('App/Exceptions/BusinessException');
const GenericException = use('App/Exceptions/GenericException');

class UploadPhotoUseCase {
  static get inject() {
    return [
      'App/Models/Campaign',
      'App/Models/CampaignPhoto',
      'FileStorage',
    ];
  }

  constructor(campaignModel, campaignPhotoModel, fileStorageProvider) {
    this.campaignModel = campaignModel;
    this.campaignPhotoModel = campaignPhotoModel;
    this.fileStorageProvider = fileStorageProvider;
  }

  async execute({ campaignId, photo }) {
    const campaign = await this.campaignModel.query().select(['id']).where({ id: campaignId }).first();
    if (!campaign)
      return { success: false, data: new NotFoundException('Campanha não encontrada') };

    const campaignPhotosCount = await this.campaignPhotoModel
      .query()
      .where({ campaign_id: campaignId })
      .getCount();

    if (Number(campaignPhotosCount) === Config.get('files.maxPhotoAmount'))
      return { success: false, data: new BusinessException('Limite de imagens por campanha atingido') };

    const photoDateTime = Date.now();

    try {
      const photoPath = await this.savePhoto(photo, photoDateTime);

      const campaignPhoto = await this.campaignPhotoModel.create({
        campaign_id: campaignId,
        url: photoPath,
      });

      return { success: true, data: campaignPhoto };
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
      .saveFile({ file: file.value, path: `${UploadHelper.getCampaignsUploadPath()}/${photoDateTime}-${file.name}` });

    if (!photo.success)
      throw new GenericException('Erro ao salvar foto');

    return photo.path;
  }

  deletePhoto(file, photoDateTime) {
    if (!file)
      return null;

    return this.fileStorageProvider
      .deleteFile({ path: `${UploadHelper.getCampaignsUploadPath()}/${photoDateTime}-${file.name}` });
  }
}

module.exports = UploadPhotoUseCase;
