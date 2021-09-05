const BaseController = use('App/Controllers/Http/BaseController');

const { ok, notFound } = require('../HttpResponses');

const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const AuditCampaignRequestModel = use('App/Controllers/RequestModels/Campaign/AuditCampaignRequestModel');

class AuditCampaignController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/AuditCampaignUpdateUseCase',
      'App/UseCases/Campaign/AuditCampaignCreateUseCase'];
  }

  constructor(auditCampaignUpdateUseCase, auditCampaignCreateUseCase) {
    super();

    this.auditCampaignUpdateUseCase = auditCampaignUpdateUseCase;
    this.auditCampaignCreateUseCase = auditCampaignCreateUseCase;
  }

  async controllerOperation(request) {
    const campaignData = new AuditCampaignRequestModel(request);

    if (request.campaign_event_type === eventLogTypes.update) {
      const result = await this.auditCampaignUpdateUseCase.execute(campaignData);

      if (result.success)
        return ok(result.data);

      return notFound(result.data.message);
    }

    const result = await this.auditCampaignCreateUseCase.execute(campaignData);

    if (result.success)
      return ok(result.data);

    return notFound(result.data.message);
  }
}

module.exports = AuditCampaignController;
