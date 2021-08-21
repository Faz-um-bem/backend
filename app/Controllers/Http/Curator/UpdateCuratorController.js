const BaseController = use('App/Controllers/Http/BaseController');
const UpdateCuratorRequestModel = use('App/Controllers/RequestModels/Curator/UpdateCuratorRequestModel');

const { ok, notFound } = use('App/Controllers/Http/HttpResponses');

class GetCuratorController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/UpdateCuratorUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const curatorData = new UpdateCuratorRequestModel(request);

    const result = await this.useCase.execute(curatorData);

    if (result.success) {
      return ok(result.data);
    }

    return notFound(result.data.message);
  }
}

module.exports = GetCuratorController;
