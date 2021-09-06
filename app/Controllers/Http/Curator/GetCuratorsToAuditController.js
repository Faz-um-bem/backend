const BaseController = use('App/Controllers/Http/BaseController');

const { ok } = use('App/Controllers/Http/HttpResponses');

class GetCuratorsToAuditController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/GetCuratorsToAuditUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const { page = 1, name = null } = request;

    const result = await this.useCase.execute(page, name);

    return ok(result);
  }
}

module.exports = GetCuratorsToAuditController;
