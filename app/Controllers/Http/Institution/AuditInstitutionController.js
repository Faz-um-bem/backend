const BaseController = use('App/Controllers/Http/BaseController');

const { ok, notFound } = require('../HttpResponses');

const { eventLogTypes } = use('App/Models/Enums/EventsLogs');

const AuditInstitutionRequestModel = use('App/Controllers/RequestModels/Institution/AuditInstitutionRequestModel');

class AuditInstitutionController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/AuditInstitutionUpdateUseCase',
      'App/UseCases/Institution/AuditInstitutionCreateUseCase'];
  }

  constructor(auditInstitutionUpdateUseCase, auditInstitutionCreateUseCase) {
    super();

    this.auditInstitutionUpdateUseCase = auditInstitutionUpdateUseCase;
    this.auditInstitutionCreateUseCase = auditInstitutionCreateUseCase;
  }

  async controllerOperation(request) {
    const institutionData = new AuditInstitutionRequestModel(request);

    if (request.institution_event_type === eventLogTypes.update) {
      const result = await this.auditInstitutionUpdateUseCase.execute(institutionData);

      if (result.success)
        return ok(result.data);

      return notFound(result.data.message);
    }

    const result = await this.auditInstitutionCreateUseCase.execute(institutionData);

    if (result.success)
      return ok(result);

    return notFound(result.data.message);
  }
}

module.exports = AuditInstitutionController;
