const { eventLogTypes, eventLogStatus } = use('App/Models/Enums/EventsLogs');
const { campaignStatus } = use('App/Models/Enums/Campaign');

const Config = use('Config');
const UploadHelper = use('App/Helpers/Upload');

const NotFoundException = use('App/Exceptions/NotFoundException');
const BusinessException = use('App/Exceptions/BusinessException');
const GenericException = use('App/Exceptions/GenericException');

class RequestCampaignUpdateUseCase {
  static get inject() {
    return [
      'App/Models/Campaign',
      'App/Models/Institution',
      'App/Models/CampaignEventsLog',
      'App/Models/Shared/UnitOfWork',
      'FileStorage',
    ];
  }

  constructor(campaignModel, institutionModel, campaignEventsLogModel, uow, fileStorageProvider) {
    this.campaignModel = campaignModel;
    this.institutionModel = institutionModel;
    this.campaignEventsLogModel = campaignEventsLogModel;
    this.uow = uow;
    this.fileStorageProvider = fileStorageProvider;
  }

  async execute({ tags, file, ...campaignData }) {
    const photoDateTime = Date.now();

    try {
      await this.uow.startTransaction();

      const campaignEventsLog = await this.campaignEventsLogModel
        .query()
        .where({
          status: eventLogStatus.underReview,
          campaign_id: campaignData.id,
        })
        .first();
      if (campaignEventsLog)
        return { success: false, data: new BusinessException('Campanha possui análise pendente') };

      const institution = await this.institutionModel.find(campaignData.institution_id);
      if (!institution)
        return { success: false, data: new NotFoundException('Instituição não existente') };

      const campaign = await this.campaignModel.find(campaignData.id);
      if (!campaign || campaign.institution_id !== institution.id)
        return { success: false, data: new NotFoundException('Campanha não encontrada') };

      const hasChangedTags = await this.hasChangedTags(campaign, tags);

      const fieldsToUpdate = {};

      const fieldsSettedResult = this.setFieldsToUpdate(
        campaign,
        campaignData,
        fieldsToUpdate,
      );

      // Caso nenhum dado da campanha, tags e imagem esteja sendo alterado retorna erro
      if (!fieldsSettedResult.success && !file && !hasChangedTags)
        return fieldsSettedResult;

      if (fieldsSettedResult.success)
        await this.campaignEventsLogModel.create(
          {
            event_type: eventLogTypes.update,
            data: JSON.stringify(fieldsToUpdate),
            campaign_id: campaign.id,
          },
          this.uow.transaction,
        );

      // Atualização das tags da campanha não passa por aprovação
      await this.updateTags(campaign, tags, this.uow.transaction);

      // Atualização da imagem da campanha não passa por aprovação
      await this.saveLogo(file, photoDateTime, campaign, this.uow.transaction);

      if (campaign.status === campaignStatus.refused && fieldsSettedResult.success) {
        campaign.merge({
          status: campaignStatus.underReview,
        });

        await campaign.save(this.uow.transaction);
      }

      await this.uow.commitTransaction();

      return { success: true, data: 'Pedido de atualização efetuado com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      await this.deleteLogo(file, photoDateTime);

      throw error;
    }
  }

  async saveLogo(file, photoDateTime, campaign, transaction) {
    if (!file)
      return;

    const allowedTypes = Config.get('files.allowedTypes');
    if (!allowedTypes.has(file.type))
      throw new BusinessException('Tipo de arquivo não suportado');

    const maxSize = Config.get('files.maxSize');
    if (maxSize < file.size)
      throw new BusinessException(`Tamanho maximo do arquivo deve ser ${maxSize}`);

    const logo = await this.fileStorageProvider
      .saveFile({ file: file.value, path: `${UploadHelper.getCampaignsUploadPath()}/${photoDateTime}-${file.name}` });

    if (!logo.success)
      throw new GenericException('Erro ao salvar foto');

    campaign.merge({
      logo: logo.path,
    });

    await campaign.save(transaction);
  }

  deleteLogo(file, photoDateTime) {
    if (!file)
      return null;

    return this.fileStorageProvider
      .deleteFile({ path: `${UploadHelper.getCampaignsUploadPath()}/${photoDateTime}-${file.name}` });
  }

  setFieldsToUpdate(campaign, campaignData, fieldsToUpdate) {
    Object.keys(campaign.$attributes).forEach(key => {
      // eslint-disable-next-line eqeqeq
      if (campaign[key] != campaignData[key]) {
        // eslint-disable-next-line no-param-reassign
        fieldsToUpdate[key] = campaignData[key];
      }
    });

    const hasFieldsToUpdate = Object.values(fieldsToUpdate).some((field) => field !== undefined);

    if (!hasFieldsToUpdate)
      return { success: false, data: new BusinessException('Necessário informar campos para serem alterados na campanha') };

    return { success: true };
  }

  async updateTags(campaign, tags, transaction) {
    await campaign.tags().delete(transaction);

    if (tags.length > 0)
      await campaign.tags().createMany(tags.map(tag => ({ tag_id: tag })), transaction);
  }

  async hasChangedTags(campaign, tags) {
    await campaign.load('tags');

    const { rows: campaignTags } = campaign.getRelated('tags');

    if (tags.length !== campaignTags.length)
      return true;

    // Verifica se cada uma das tags cadastradas na camapanha está dentro do array
    // de tags enviado pelo usuário
    const hasChanged = !campaignTags.every(campaignTag => tags.some(
      (tag) => tag === campaignTag.tag_id,
    ));

    return hasChanged;
  }
}

module.exports = RequestCampaignUpdateUseCase;
