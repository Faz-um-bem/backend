const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const NotFoundException = use('App/Exceptions/NotFoundException');

const BusinessException = use('App/Exceptions/BusinessException');

class RequestCampaignUpdateUseCase {
  static get inject() {
    return ['App/Models/Campaign',
      'App/Models/Institution',
      'App/Models/CampaignEventsLog',
      'App/Models/Shared/UnitOfWork'];
  }

  constructor(campaignModel, institutionModel, campaignEventsLogModel, uow) {
    this.campaignModel = campaignModel;
    this.institutionModel = institutionModel;
    this.campaignEventsLogModel = campaignEventsLogModel;
    this.uow = uow;
  }

  async execute(campaignData) {
    const campaignEventsLog = await this.campaignEventsLogModel
      .query()
      .where({
        status: 2,
        event_type: 1,
        campaign_id: campaignData.id,
      })
      .first();

    if (campaignEventsLog) {
      return { success: false, data: new BusinessException('Campanha já possui atualização em análise') };
    }

    const institution = await this.institutionModel.find(campaignData.institution_id);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não existente') };
    }

    const campaign = await this.campaignModel.find(campaignData.id);
    if (!campaign || campaign.institution_id !== institution.id) {
      return { success: false, data: new NotFoundException('Campanha não encontrada') };
    }

    const updateRequestData = {};

    // Salva em updateRequestData apenas os dados alterados na campanha
    Object.keys(campaign.$attributes).forEach(key => {
      if (campaign[key] != campaignData[key]) {
        updateRequestData[key] = campaignData[key];
      }
    });

    try {
      await this.uow.startTransaction();

      await this.campaignEventsLogModel.create({
        event_type: eventLogTypes.update,
        data: JSON.stringify(updateRequestData),
        campaign_id: campaign.id,
      });

      await this.uow.commitTransaction();

      return { success: true, data: 'Pedido de atualização efetuado com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = RequestCampaignUpdateUseCase;
