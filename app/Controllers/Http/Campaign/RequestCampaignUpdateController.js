const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = require('../HttpResponses');

const RequestCampaignUpdateRequestModel = use('App/Controllers/RequestModels/Campaign/RequestCampaignUpdateRequestModel');

class RequestCampaignUpdateController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/RequestCampaignUpdateUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const campaignData = new RequestCampaignUpdateRequestModel(request);

    const result = await this.useCase.execute(campaignData);
    if (result.success) {
      return ok(result.data);
    }

    return handleError(result.data);
  }
}

module.exports = RequestCampaignUpdateController;
