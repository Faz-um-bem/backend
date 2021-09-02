const BaseController = use('App/Controllers/Http/BaseController');

const { noContent, handleError } = use('App/Controllers/Http/HttpResponses');

class RevokeTokenController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/RevokeTokenUseCase', 'App/UseCases/Curator/RevokeTokenUseCase'];
  }

  constructor(institutionRevokeTokenUseCase, curatorRevokeTokenUseCase) {
    super();

    this.institutionRevokeTokenUseCase = institutionRevokeTokenUseCase;
    this.curatorRevokeTokenUseCase = curatorRevokeTokenUseCase;
  }

  async controllerOperation(requestData) {
    const { id, refreshToken, type } = requestData;

    let result = {};

    if (type === 'institution')
      result = await this
        .institutionRevokeTokenUseCase
        .execute({ institutionId: id, refreshToken });
    else if (type === 'curator')
      result = await this.curatorRevokeTokenUseCase.execute({ curatorId: id, refreshToken });

    if (!result.success) { return handleError(result.data); }

    return noContent();
  }
}

module.exports = RevokeTokenController;
