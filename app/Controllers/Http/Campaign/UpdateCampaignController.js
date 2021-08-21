const { ok, notFound } = require('../HttpResponses');

const BaseController = use('App/Controllers/Http/BaseController');

const UpdateCampaignRequestModel = use('App/Controllers/RequestModels/Campaign/UpdateCampaignRequestModel');

class UpdateCampaignController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/UpdateCampaignUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const campaignData = new UpdateCampaignRequestModel(request);

    const result = await this.useCase.execute(campaignData);
    if (result.success) {
      return ok(result);
    }

    return notFound(result.data.message);
  }
}

module.exports = UpdateCampaignController;
