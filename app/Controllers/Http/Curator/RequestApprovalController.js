const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = use('App/Controllers/Http/HttpResponses');

class AuditCuratorController extends BaseController {
  static get inject() {
    return ['App/UseCases/Curator/RequestApprovalUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation({ id }) {
    const result = await this.useCase.execute(id);

    if (!result.success)
      return handleError(result.data);

    return ok(result.data);
  }
}

module.exports = AuditCuratorController;
