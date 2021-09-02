const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = use('App/Controllers/Http/HttpResponses');

class RefreshTokenController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/RefreshTokenUseCase', 'App/UseCases/Curator/RefreshTokenUseCase'];
  }

  constructor(institutionRefreshTokenUseCase, curatorRefreshTokenUseCase) {
    super();

    this.institutionRefreshTokenUseCase = institutionRefreshTokenUseCase;
    this.curatorRefreshTokenUseCase = curatorRefreshTokenUseCase;
  }

  async controllerOperation(requestData) {
    const { id, refreshToken, type } = requestData;

    let result = {};

    if (type === 'institution')
      result = await this
        .institutionRefreshTokenUseCase
        .execute({ institutionId: id, refreshToken });
    else if (type === 'curator')
      result = await this.curatorRefreshTokenUseCase.execute({ curatorId: id, refreshToken });

    if (!result.success) { return handleError(result.data); }

    return ok(result.data);
  }
}

module.exports = RefreshTokenController;
