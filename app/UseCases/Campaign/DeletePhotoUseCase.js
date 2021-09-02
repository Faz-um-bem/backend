const NotFoundException = use('App/Exceptions/NotFoundException');
const GenericException = use('App/Exceptions/GenericException');

class DeletePhotoUseCase {
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

  async execute({ campaignId, photoId }) {
    const campaign = await this.campaignModel.query().select(['id']).where({ id: campaignId }).first();
    if (!campaign)
      return { success: false, data: new NotFoundException('Campanha não encontrada') };

    const campaignPhoto = await this.campaignPhotoModel.find(photoId);
    if (!campaignPhoto)
      return { success: false, data: new NotFoundException('Foto não encontrada') };

    await campaignPhoto.delete();

    const deletedPhoto = await this.fileStorageProvider
      .deleteFile({ path: campaignPhoto.url });

    if (!deletedPhoto.success)
      return { success: false, data: new GenericException(deletedPhoto.data) };

    return { success: true, data: 'Foto deletada com sucesso' };
  }
}

module.exports = DeletePhotoUseCase;
