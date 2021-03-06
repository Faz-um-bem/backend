const BaseController = use('App/Controllers/Http/BaseController');

const { ok } = use('App/Controllers/Http/HttpResponses');

class GetCampaignsController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/GetCampaignsUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const { page } = request;

    const result = await this.useCase.execute(page);

    return ok(result.data);
  }
}

module.exports = GetCampaignsController;
