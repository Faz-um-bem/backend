const BaseController = use('App/Controllers/Http/BaseController');

const { noContent, handleError } = use('App/Controllers/Http/HttpResponses');

class RevokeTokenController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/RevokeTokenUseCase'];
  }

  constructor(institutionRevokeTokenUseCase) {
    super();

    this.institutionRevokeTokenUseCase = institutionRevokeTokenUseCase;
  }

  async controllerOperation(requestData) {
    const { id, refreshToken, type } = requestData;

    let result = {};

    if (type === 'institution')
      result = await this
        .institutionRevokeTokenUseCase
        .execute({ institutionId: id, refreshToken });
    else if (type === 'curator')
      result = { success: false, data: new Error('Revogação do token do curador não implementada') };

    if (!result.success) { return handleError(result.data); }

    return noContent();
  }
}

module.exports = RevokeTokenController;
