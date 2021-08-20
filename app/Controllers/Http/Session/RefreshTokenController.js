const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = use('App/Controllers/Http/HttpResponses');

class RefreshTokenController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/RefreshTokenUseCase'];
  }

  constructor(institutionRefreshTokenUseCase) {
    super();

    this.institutionRefreshTokenUseCase = institutionRefreshTokenUseCase;
  }

  async controllerOperation(requestData) {
    const { id, refreshToken, type } = requestData;

    let result = {};

    if (type === 'institution')
      result = await this
        .institutionRefreshTokenUseCase
        .execute({ institutionId: id, refreshToken });
    else if (type === 'curator')
      result = { success: false, data: new Error('Atualização do token do curador não implementado') };

    if (!result.success) { return handleError(result.data); }

    return ok(result.data);
  }
}

module.exports = RefreshTokenController;
