const BaseController = use('App/Controllers/Http/BaseController');
const { handleError, ok } = use('App/Controllers/Http/HttpResponses');

class UploadPhotoController extends BaseController {
  static get inject() {
    return ['App/UseCases/Campaign/UploadPhotoUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation({ photo, id }) {
    const result = await this.useCase.execute({ photo, campaignId: id });

    if (!result.success)
      return handleError(result.data);

    return ok(result.data);
  }
}

module.exports = UploadPhotoController;
