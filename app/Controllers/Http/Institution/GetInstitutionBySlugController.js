const BaseControler = use('App/Controllers/Http/BaseController');

const { ok, notFound } = use('App/Controllers/Http/HttpResponses');

class GetInstitutionBySlugController extends BaseControler {
  static get inject() {
    return ['App/UseCases/Institution/GetInstitutionBySlugUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const result = await this.useCase.execute(request);

    if (result.success) {
      return ok(result.data);
    }

    return notFound(result.data.message);
  }
}

module.exports = GetInstitutionBySlugController;
