const BaseController = use('App/Controllers/Http/BaseController');

const { ok, notFound } = use('App/Controllers/Http/HttpResponses');

class GetCampaignsToAuditController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/GetCampaignsToAuditUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const { page } = request;

    const result = await this.useCase.execute(page);

    return ok(result);
  }
}

module.exports = GetCampaignsToAuditController;