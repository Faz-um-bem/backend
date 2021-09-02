const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

const SlugHelper = use('App/Helpers/Slug');

const NotFoundException = use('App/Exceptions/NotFoundException');

class AuditCampaignUpdateUseCase {
  static get inject() {
    return ['App/Models/Campaign',
      'App/Models/CampaignEventsLog',
      'App/Models/Shared/UnitOfWork'];
  }

  constructor(campaignModel, campaignEventsLogModel, uow) {
    this.campaignModel = campaignModel;
    this.campaignEventsLogModel = campaignEventsLogModel;
    this.uow = uow;
  }

  async execute(requestData) {
    const campaignEventLog = await this.campaignEventsLogModel
      .query()
      .where({
        status: 2,
        event_type: 1,
        campaign_id: requestData.id,
      })
      .first();

    if (!campaignEventLog) {
      return { success: false, data: new NotFoundException('Não há solicitação de atualização') };
    }

    try {
      await this.uow.startTransaction();

      if (requestData.approved) {
        campaignEventLog.merge({
          status: eventLogStatus.approved,
          curator_review: requestData.curator_review,
          curator_id: requestData.curator_id,
        });
        await campaignEventLog.save(this.uow.transaction);

        const campaign = await this.campaignModel.find(requestData.id);

        campaign.merge({
          ...campaignEventLog.data,
          ...campaignEventLog.data.title
          && { slug: SlugHelper.createSlug({ text: campaignEventLog.data.title }) },
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

      await this.uow.commitTransaction();

      return { success: true, data: 'Atualização rejeitada com sucesso' };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = AuditCampaignUpdateUseCase;
