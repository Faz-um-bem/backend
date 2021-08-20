const BaseController = use('App/Controllers/Http/BaseController');

const { noContent, notFound } = use('App/Controllers/Http/HttpResponses');

class GetCuratorController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/DeleteCuratorUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const result = await this.useCase.execute(request.id);

    if (!result.success) {
      return notFound(result.data.message);
    }

    return noContent();
  }
}

module.exports = GetCuratorController;
