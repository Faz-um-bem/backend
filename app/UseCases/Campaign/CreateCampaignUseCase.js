const { campaignStatus } = use('App/Models/Enums/Campaign');

const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const slugify = require('slugify');

const NotFoundException = use('App/Exceptions/NotFoundException');
class CreateCampaignUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Campaign',
      'App/Models/Institution',
      'App/Models/CampaignEventsLog',
      'App/Models/Shared/UnitOfWork'];
  }

  // Recebe dependências declaradas no inject
  constructor(campaignModel, institutionModel, campaignEventsLogModel, uow) {
    this.campaignModel = campaignModel;
    this.institutionModel = institutionModel;
    this.campaignEventsLogModel = campaignEventsLogModel;
    this.uow = uow;
  }

  async execute(campaignData) {
    // Verifica se a instituição onde a campanha será criada existe
    const institution = await this.institutionModel.find(campaignData.institution_id);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não existente') };
    }

    const slug = slugify(`${campaignData.title} ${institution.name}`, {
      replacement: '-',
      lower: true,
    });

    // Inicia a transaction que gerencia a criação de campanha
    try {
      await this.uow.startTransaction();

      const campaign = await this.campaignModel.create(
        {
          ...campaignData,
          status: campaignStatus.underReview,
          slug,
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

      throw error;
    }
  }
}

module.exports = CreateCampaignUseCase;
