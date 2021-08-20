const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = use('App/Controllers/Http/HttpResponses');

class LoginController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/LoginUseCase'];
  }

  constructor(institutionLoginUseCase) {
    super();

    this.institutionLoginUseCase = institutionLoginUseCase;
  }

  async controllerOperation(requestData) {
    const { email, password, type } = requestData;

    let result = {};

    if (type === 'institution')
      result = await this.institutionLoginUseCase.execute({ email, password });
    else if (type === 'curator')
      result = { success: false, data: new Error('Login do curador não implementado') };

    if (!result.success) { return handleError(result.data); }

    return ok(result.data);
  }
}

module.exports = LoginController;
