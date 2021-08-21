const BaseController = use('App/Controllers/Http/BaseController');

const { ok, notFound } = use('App/Controllers/Http/HttpResponses');

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

    if (result.success) {
      return ok(result.data);
    }

    return notFound(result.data.message);
  }
}

module.exports = GetCampaignsController;
