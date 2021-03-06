const BaseController = use('App/Controllers/Http/BaseController');

const CreateInstitutionRequestModel = use('App/Controllers/RequestModels/Institution/CreateInstitutionRequestModel');

const { badRequest, created } = use('App/Controllers/Http/HttpResponses');

class CreateInstitutionController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/CreateInstitutionUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const institutionData = new CreateInstitutionRequestModel(request);

    const result = await this.useCase.execute(institutionData);

    if (!result.success)
      return badRequest(result.message);

    return created(result.data);
  }
}

module.exports = CreateInstitutionController;
