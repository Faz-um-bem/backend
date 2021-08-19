const BaseController = use('App/Controllers/Http/BaseController');

const CreateCampaignRequestModel = use('App/Controllers/RequestModels/Campaign/CreateCampaignRequestModel');

const { created, badRequest } = use('App/Controllers/Http/HttpResponses');

class CreateCampaignController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/CreateCampaignUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const campaignData = new CreateCampaignRequestModel(request);

    const result = await this.useCase.execute(campaignData);
    if (result) {
      return created(result);
    }

    return badRequest(result.data.message);
  }
}

module.exports = CreateCampaignController;
