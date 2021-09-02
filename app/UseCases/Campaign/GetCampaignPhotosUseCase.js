class GetCampaignPhotosUseCase {
  static get inject() {
    return ['App/Models/CampaignPhoto'];
  }

  constructor(campaignPhotoModel) {
    this.campaignPhotoModel = campaignPhotoModel;
  }

  execute(page, campaignId) {
    return this.campaignPhotoModel.paginate(page, 20, { campaign_id: campaignId });
  }
}

module.exports = GetCampaignPhotosUseCase;
