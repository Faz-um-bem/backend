const BaseController = use('App/Controllers/Http/BaseController');

const { ok } = use('App/Controllers/Http/HttpResponses');

class ListTagsController extends BaseController {
  static get inject() {
    return ['App/UseCases/CampaignTag/ListTagsUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation() {
    const result = await this.useCase.execute();

    return ok(result);
  }
}

module.exports = ListTagsController;
