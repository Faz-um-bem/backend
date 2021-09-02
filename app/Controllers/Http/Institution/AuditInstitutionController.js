const BaseController = use('App/Controllers/Http/BaseController');

const { ok, notFound } = require('../HttpResponses');

const AuditInstitutionRequestModel = use('App/Controllers/RequestModels/Institution/AuditInstitutionRequestModel');

class AuditInstitutionController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/AuditInstitutionUpdateUseCase',
      'App/UseCases/Institution/AuditInstitutionCreateUseCase'];
  }

  constructor(auditInstitutionUpdateUseCaseuseCase, auditInstitutionCreateUseCase) {
    super();

    this.auditInstitutionUpdateUseCaseuseCase = auditInstitutionUpdateUseCaseuseCase;
    this.auditInstitutionCreateUseCase = auditInstitutionCreateUseCase;
  }

  async controllerOperation(request) {
    const institutionData = new AuditInstitutionRequestModel(request);
    if (request.institution_event_type) {
      const result = await this.auditInstitutionUpdateUseCaseuseCase.execute(institutionData);
      if (result.success) {
        return ok(result);
      }

      return notFound(result.data.message);
    }

    const result = await this.auditInstitutionCreateUseCase.execute(institutionData);

    if (result.success) {
      return ok(result);
    }

    return notFound(result.data.message);
  }
}

module.exports = AuditInstitutionController;
