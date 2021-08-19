const { campaignStatus } = use('App/Models/Enums/Campaign');

const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const NotFoundException = use('App/Exceptions/NotFoundException');
class CreateCampaignUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Campaign', 'App/Models/Institution', 'App/Models/CampaignEventsLog', 'App/Models/Shared/UnitOfWork'];
  }

  // Recebe dependências declaradas no inject
  constructor(campaignModel, institutionModel, campaignEventsLogModel, uow) {
    this.campaignModel = campaignModel;
    this.campaignEventsLogModel = campaignEventsLogModel;
    this.institutionModel = institutionModel;
    this.uow = uow;
  }

  async execute(campaignData) {
    
    // Verifica se a instituição onde a campanha será criada existe
    const institution = await this.institutionModel.find(campaignData.institution_id);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não existente') };
    }

    // Inicia a transaction que gerencia a criação de campanha
    try {
      await this.uow.startTransaction();
      
      const campaign = await this.campaignModel.create(
        {
          ...campaignData, 
          status: campaignStatus.underReview
        },
        this.uow.transaction,
      );

      await this.uow.campaignEventsLogModel.create(
        {
          event_type: eventLogTypes.create,
          data: campaign.toJSON(),
          campaign_id: campaign.campaign_id,
        },
        this.uow.transaction,
      );
      await this.uow.commitTransction();

      return campaign;
    } catch (error) {
      await this.uow.rollbackTransaction();
      
      throw error;
    }
  }
}

module.exports = CreateCampaignUseCase;
