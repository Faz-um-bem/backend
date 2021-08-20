const BaseController = use('App/Controllers/Http/BaseController');

const { noContent } = use('App/Controllers/Http/HttpResponses');

class GetCuratorController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/DeleteCuratorUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    await this.useCase.execute(request.id);

    return noContent();
  }
}

module.exports = GetCuratorController;
