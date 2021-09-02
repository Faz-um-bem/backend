const { campaignStatus } = use('App/Models/Enums/Campaign');

const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const SlugHelper = use('App/Helpers/Slug');

const NotFoundException = use('App/Exceptions/NotFoundException');
const UploadHelper = use('App/Helpers/Upload');
const GenericException = use('App/Exceptions/GenericException');
const Config = use('Config');
class CreateCampaignUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return [
      'App/Models/Campaign',
      'App/Models/Institution',
      'App/Models/CampaignEventsLog',
      'App/Models/Shared/UnitOfWork',
      'FileStorage',
    ];
  }

  // Recebe dependências declaradas no inject
  constructor(campaignModel, institutionModel, campaignEventsLogModel, uow, fileStorageProvider) {
    this.campaignModel = campaignModel;
    this.institutionModel = institutionModel;
    this.campaignEventsLogModel = campaignEventsLogModel;
    this.uow = uow;
    this.fileStorageProvider = fileStorageProvider;
  }

  async execute({ file, ...campaignData }) {
    // Verifica se a instituição onde a campanha será criada existe
    const institution = await this.institutionModel.find(campaignData.institution_id);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não existente') };
    }

    const slug = SlugHelper.createSlug({ text: `${campaignData.title} ${institution.name}` });

    const photoDateTime = Date.now();

    // Inicia a transaction que gerencia a criação de campanha
    try {
      await this.uow.startTransaction();

      const logoUploadResult = await this.saveLogo(file, photoDateTime);
      if (!logoUploadResult.success)
        return logoUploadResult;

      const campaign = await this.campaignModel.create(
        {
          ...campaignData,
          status: campaignStatus.underReview,
          slug,
          logo: logoUploadResult.path,
        },
        this.uow.transaction,
      );

      await this.campaignEventsLogModel.create(
        {
          event_type: eventLogTypes.create,
          data: campaign.toJSON(),
          campaign_id: campaign.id,
        },
        this.uow.transaction,
      );

      await this.uow.commitTransaction();

      return { success: true, data: campaign };
    } catch (error) {
      await this.uow.rollbackTransaction();

      await this.deleteLogo(file, photoDateTime);

      throw error;
    }
  }

  async saveLogo(file, photoDateTime) {
    if (!file)
      return { success: true, path: null };

    const allowedTypes = Config.get('files.allowedTypes');
    if (!allowedTypes.has(file.type))
      return { success: false, message: 'Tipo de arquivo não suportado' };

    const maxSize = Config.get('files.maxSize');
    if (maxSize < file.size)
      return { success: false, message: `Tamanho maximo do arquivo deve ser ${maxSize}` };

    const logo = await this.fileStorageProvider
      .saveFile({ file: file.value, path: `${UploadHelper.getCampaignsUploadPath()}/${photoDateTime}-${file.name}` });

    if (!logo.success)
      throw new GenericException('Erro ao salvar foto');

    return logo;
  }

  deleteLogo(file, photoDateTime) {
    if (!file)
      return null;

    return this.fileStorageProvider
      .deleteFile({ path: `${UploadHelper.getCampaignsUploadPath()}/${photoDateTime}-${file.name}` });
  }
}

module.exports = CreateCampaignUseCase;
