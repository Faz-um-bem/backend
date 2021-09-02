const BaseController = use('App/Controllers/Http/BaseController');

const { ok, notFound } = require('../HttpResponses');

const AuditCampaignRequestModel = use('App/Controllers/RequestModels/Campaign/AuditCampaignRequestModel');

class AuditCampaignController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/AuditCampaignUpdateUseCase',
      'App/UseCases/Campaign/AuditCampaignCreateUseCase'];
  }

  constructor(auditCampaignUpdateUseCaseuseCase, auditCampaignCreateUseCase) {
    super();

    this.auditCampaignUpdateUseCaseuseCase = auditCampaignUpdateUseCaseuseCase;
    this.auditCampaignCreateUseCase = auditCampaignCreateUseCase;
  }

  async controllerOperation(request) {
    const campaignData = new AuditCampaignRequestModel(request);
    if (request.campaign_event_type) {
      const result = await this.auditCampaignUpdateUseCaseuseCase.execute(campaignData);
      if (result.success) {
        return ok(result);
      }

      return notFound(result.data.message);
    }

    const result = await this.auditCampaignCreateUseCase.execute(campaignData);

    if (result.success) {
      return ok(result);
    }

    return notFound(result.data.message);
  }
}

module.exports = AuditCampaignController;
