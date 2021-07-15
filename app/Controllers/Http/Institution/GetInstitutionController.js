const BaseController = use('App/Controllers/Http/BaseController');

const { ok, notFound } = use('App/Controllers/Http/HttpResponses');

class GetInstitutionController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/GetInstitutionUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const result = await this.useCase.execute(request.id);

    if(result.success){
        return ok(result.data);
    }

    return notFound(result.data.message);
  }
}

module.exports = GetInstitutionController;
