const BaseControler = use('App/Controllers/Http/BaseController');

const { ok, notFound } = require('../HttpResponses');

const UpdateInstitutionRequestModel = use('App/Controllers/RequestModels/Institution/UpdateInstitutionRequestModel');

class UpdateCampaignController extends BaseControler {
  static get inject() {
    return ['App/UseCases/Institution/UpdateInstitutionUseCase'];
  }

  constructor(useCase) {
    super();

    this.useCase = useCase;
  }

  async controllerOperation(request) {
    const institutionData = new UpdateInstitutionRequestModel(request);

    const result = await this.useCase.execute(institutionData);
    if (result.success) {
      return ok(result);
    }

    return notFound(result.data.message);
  }
}

module.exports = UpdateCampaignController;
