const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const slugify = require('slugify');

const NotFoundException = use('App/Exceptions/NotFoundException');

class UpdateCampaignUseCase {
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
    const institution = await this.institutionModel.find(campaignData.institution_id);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não existente') };
    }

    const campaign = await this.campaignModel.find(campaignData.id);
    if (!campaign || campaign.institution_id !== institution.id) {
      return { success: false, data: new NotFoundException('Campanha não encontrada') };
    }

    const slug = slugify(`${campaignData.title} ${institution.name}`, {
      replacement: '-',
      lower: true,
    });

    try {
      await this.uow.startTransaction();

      campaign.merge({ ...campaignData, slug });

      await campaign.save(this.uow.transaction);

      await this.campaignEventsLogModel.create(
        {
          event_type: eventLogTypes.update,
          data: campaign.toJSON(),
          campaign_id: campaign.id,
        },
      );
      await this.uow.commitTransaction();

      return { success: true, data: campaign };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = UpdateCampaignUseCase;
