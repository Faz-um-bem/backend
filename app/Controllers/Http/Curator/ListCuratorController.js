const BaseController = use('App/Controllers/Http/BaseController');

const ListCuratorRequestModel = use('App/Controllers/RequestModels/Curator/ListCuratorRequestModel');

const { ok, notFound } = use('App/Controllers/Http/HttpResponses');

class ListCuratorController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/ListCuratorUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const curatorData = new ListCuratorRequestModel(request);

    const result = await this.useCase.execute(curatorData);

    if (result.success) {
      return ok(result.data);
    }

    return notFound(result.data.message);
  }
}

module.exports = ListCuratorController;
