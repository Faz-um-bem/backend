const BaseController = use('App/Controllers/Http/BaseController');

const { ok, handleError } = use('App/Controllers/Http/HttpResponses');

class UpdatePasswordController extends BaseController {
  static get inject() {
    return ['App/UseCases/Institution/UpdatePasswordUseCase', 'App/UseCases/Curator/UpdatePasswordUseCase'];
  }

  constructor(updatePasswordInstitutionUseCase, updatePasswordCuratorUseCase) {
    super();

    this.updatePasswordInstitutionUseCase = updatePasswordInstitutionUseCase;
    this.updatePasswordCuratorUseCase = updatePasswordCuratorUseCase;
  }

  async controllerOperation(request) {
    const { type } = request;

    let result = {};

    if (type === 'institution')
      result = await this.updatePasswordInstitutionUseCase.execute(request);
    else if (type === 'curator')
      result = await this.updatePasswordCuratorUseCase.execute(request);

    return result.success
      ? ok(result.data)
      : handleError(result.data);
  }
}

module.exports = UpdatePasswordController;
