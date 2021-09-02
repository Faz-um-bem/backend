const BaseController = use('App/Controllers/Http/BaseController');
const { handleError, ok } = use('App/Controllers/Http/HttpResponses');

class DeletePhotoController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/DeletePhotoUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(requestData) {
    const result = await this.useCase.execute(
      { institutionId: requestData.id, photoId: requestData.photoId },
    );

    if (!result.success)
      return handleError(result.data);

    return ok(result.data);
  }
}

module.exports = DeletePhotoController;
