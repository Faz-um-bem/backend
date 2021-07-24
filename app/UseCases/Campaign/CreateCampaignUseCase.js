const { campaignStatus } = use('App/Models/Enums/Campaign');

class CreateCampaignUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Campaign'];
  }

  // Recebe dependências declaradas no inject
  constructor(campaignModel) {
    this.campaignModel = campaignModel;
  }

  async execute(campaignData) {
    const campaign = await this.campaignModel.create(
      { ...campaignData, status: campaignStatus.underReview },
    );

    return campaign;
  }
}

module.exports = CreateCampaignUseCase;
