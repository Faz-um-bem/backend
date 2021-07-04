const BaseController = use('App/Controllers/Http/BaseController');

class CreateInstitutionController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/CreateInstitutionUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    return this.useCase.execute(request);
  }
}

module.exports = CreateInstitutionController;
