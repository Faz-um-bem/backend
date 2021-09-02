const BaseController = use('App/Controllers/Http/BaseController');

const { ok } = use('App/Controllers/Http/HttpResponses');

class GetCampaignPhotosController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/GetCampaignPhotosUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation({ page, id }) {
    const campaignPhotos = await this.useCase.execute(page, id);

    return ok(campaignPhotos);
  }
}

module.exports = GetCampaignPhotosController;
