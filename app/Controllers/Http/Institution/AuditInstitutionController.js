const BaseController = use('App/Controllers/Http/BaseController');

const { ok, notFound } = require('../HttpResponses');

const AuditInstitutionRequestModel = use('App/Controllers/RequestModels/Institution/AuditInstitutionRequestModel');

class AuditInstitutionController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/AuditInstitutionUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const institutionData = new AuditInstitutionRequestModel(request);

    const result = await this.useCase.execute(institutionData);
    if (result.success) {
      return ok(result);
    }

    return notFound(result.data.message);
  }
}

module.exports = AuditInstitutionController;
