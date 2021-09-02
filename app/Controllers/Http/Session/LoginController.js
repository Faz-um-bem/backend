const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = use('App/Controllers/Http/HttpResponses');

class LoginController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/LoginUseCase', 'App/UseCases/Curator/LoginUseCase'];
  }

  constructor(institutionLoginUseCase, curatorLoginUseCase) {
    super();

    this.institutionLoginUseCase = institutionLoginUseCase;
    this.curatorLoginUseCase = curatorLoginUseCase;
  }

  async controllerOperation(requestData) {
    const { email, password, type } = requestData;

    let result = {};

    if (type === 'institution')
      result = await this.institutionLoginUseCase.execute({ email, password });
    else if (type === 'curator')
      result = await this.curatorLoginUseCase.execute({ email, password });

    if (!result.success) { return handleError(result.data); }

    return ok(result.data);
  }
}

module.exports = LoginController;
