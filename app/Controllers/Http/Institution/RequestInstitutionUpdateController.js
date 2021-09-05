const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = require('../HttpResponses');

const RequestInstitutionUpdateRequestModel = use('App/Controllers/RequestModels/Institution/RequestInstitutionUpdateRequestModel');

class RequestInstitutionUpdateController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/RequestInstitutionUpdateUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const institutionData = new RequestInstitutionUpdateRequestModel(request);

    const result = await this.useCase.execute(institutionData);
    if (result.success) {
      return ok(result.data);
    }

    return handleError(result.data);
  }
}

module.exports = RequestInstitutionUpdateController;
