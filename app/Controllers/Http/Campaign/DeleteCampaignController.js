const { noContent, notFound } = require('../HttpResponses');

const BaseController = use('App/Controllers/Http/BaseController');

class DeleteCampaignController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/DeleteCampaignUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const result = await this.useCase.execute(request);

    if (result.success) {
      return noContent();
    }

    return notFound(result.data.message);
  }
}

module.exports = DeleteCampaignController;
