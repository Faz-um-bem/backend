const { eventLogStatus, eventLogTypes } = use('App/Models/Enums/EventsLogs');

const { campaignStatus } = use('App/Models/Enums/Campaign');

const SlugHelper = use('App/Helpers/Slug');

const NotFoundException = use('App/Exceptions/NotFoundException');

class AuditCampaignUpdateUseCase {
  static get inject() {
    return [
      'App/Models/Campaign',
      'App/Models/CampaignEventsLog',
      'App/Models/Shared/UnitOfWork',
    ];
  }

  constructor(campaignModel, campaignEventsLogModel, uow) {
    this.campaignModel = campaignModel;
    this.campaignEventsLogModel = campaignEventsLogModel;
    this.uow = uow;
  }

  async execute(requestData) {
    try {
      await this.uow.startTransaction();

      const campaignEventLog = await this.campaignEventsLogModel
        .query()
        .where({
          status: eventLogStatus.underReview,
          event_type: eventLogTypes.update,
          campaign_id: requestData.id,
        })
        .first();
      if (!campaignEventLog)
        return { success: false, data: new NotFoundException('Solicitação de atualização não encontrada') };

      const campaign = await this.campaignModel.find(requestData.id);
      if (!campaign)
        return { success: false, data: new NotFoundException('Campanha não encontrada') };

      if (requestData.approved) {
        campaignEventLog.merge({
          status: eventLogStatus.approved,
          curator_review: requestData.curator_review,
          curator_id: requestData.curator_id,
        });

        await campaignEventLog.save(this.uow.transaction);

        campaign.merge({
          ...campaignEventLog.data,
          ...campaignEventLog.data.title
          && { slug: SlugHelper.createSlug({ text: campaignEventLog.data.title }) },
          status: eventLogStatus.approved,
        });

        await campaign.save(this.uow.transaction);

        await this.uow.commitTransaction();

        return { success: true, data: 'Atualização aprovada com sucesso' };
      }

      campaignEventLog.merge({
        status: eventLogStatus.rejected,
        curator_review: requestData.curator_review,
        curator_id: requestData.curator_id,
      });

      await campaignEventLog.save(this.uow.transaction);

      if (campaign.status === campaignStatus.underReview) {
        campaign.merge({
          status: campaignStatus.refused,
        });

        await campaign.save(this.uow.transaction);
      }

      await this.uow.commitTransaction();

      return { success: true, data: 'Atualização rejeitada com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = AuditCampaignUpdateUseCase;
