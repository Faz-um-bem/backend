const { campaignStatus } = use('App/Models/Enums/Campaign');

const NotFoundException = use('App/Exceptions/NotFoundException');
class CreateCampaignUseCase {
  // Injeta dependências no construtor
  static get inject() {
    return ['App/Models/Campaign', 'App/Models/Institution'];
  }

  // Recebe dependências declaradas no inject
  constructor(campaignModel, institutionModel) {
    this.campaignModel = campaignModel;
    this.institutionModel = institutionModel;
  }

  async execute(campaignData) {
    const institution = await this.institutionModel.find(campaignData.referred_institution);
    if (!institution) {
      return { success: false, data: new NotFoundException('Instituição não existente') };
    }

    const campaign = await this.campaignModel.create(
      { ...campaignData, status: campaignStatus.underReview },
    );

    return { success: true, data: campaign };
  }
}

module.exports = CreateCampaignUseCase;
