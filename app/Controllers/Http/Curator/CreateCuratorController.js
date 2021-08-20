const BaseController = use('App/Controllers/Http/BaseController');

const CreateCuratorRequestModel = use('App/Controllers/RequestModels/Curator/CreateCuratorRequestModel');

const { created } = use('App/Controllers/Http/HttpResponses');

class CreateCuratorController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/CreateCuratorUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const curatorData = new CreateCuratorRequestModel(request);

    const result = await this.useCase.execute(curatorData);

    return created(result);
  }
}

module.exports = CreateCuratorController;
