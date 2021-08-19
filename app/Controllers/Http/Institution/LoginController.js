const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = use('App/Controllers/Http/HttpResponses');

class LoginController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/LoginUseCase'];
  }

  constructor(loginUseCase) {
    super();

    this.loginUseCase = loginUseCase;
  }

  async controllerOperation(requestData) {
    const { email, password } = requestData;

    const result = await this.loginUseCase.execute({ email, password });

    if (!result.success) { return handleError(result.data); }

    return ok(result.data);
  }
}

module.exports = LoginController;
