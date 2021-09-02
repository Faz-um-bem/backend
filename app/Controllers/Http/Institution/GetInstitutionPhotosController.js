const BaseController = use('App/Controllers/Http/BaseController');

const { ok } = use('App/Controllers/Http/HttpResponses');

class GetInstitutionPhotosController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/GetInstitutionPhotosUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation({ page, id }) {
    const institutionPhotos = await this.useCase.execute(page, id);

    return ok(institutionPhotos);
  }
}

module.exports = GetInstitutionPhotosController;
