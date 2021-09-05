const BaseController = use('App/Controllers/Http/BaseController');

const AuditCuratorRequestModel = use('App/Controllers/RequestModels/Curator/AuditCuratorRequestModel');

const { ok, notFound } = use('App/Controllers/Http/HttpResponses');

class AuditCuratorController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/AuditCuratorUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const curatorData = new AuditCuratorRequestModel(request);

    const result = await this.useCase.execute(curatorData);

    if (!result.success)
      return notFound(result.data.message);

    return ok(result.data);
  }
}

module.exports = AuditCuratorController;
