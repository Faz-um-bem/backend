const BaseController = use('App/Controllers/Http/BaseController');

const { ok } = use('App/Controllers/Http/HttpResponses');

class GetCuratorLogController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/GetCuratorLogUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const { page = 1, status = null } = request;

    const result = await this.useCase.execute(page, request.id, status);

    return ok(result);
  }
}

module.exports = GetCuratorLogController;
