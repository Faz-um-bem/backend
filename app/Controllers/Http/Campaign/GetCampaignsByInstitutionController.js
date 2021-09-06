const BaseControler = use('App/Controllers/Http/BaseController');

const { ok } = use('App/Controllers/Http/HttpResponses');

class GetCampaignsByInstitutionController extends BaseControler {
  static get inject() {
    return ['App/UseCases/Campaign/GetCampaignsByInstitutionUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const { page = 1, title = null, status = null } = request;

    const result = await this.useCase.execute(page, request.id, title, status);

    return ok(result);
  }
}

module.exports = GetCampaignsByInstitutionController;
