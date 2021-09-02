class ListTagsUseCase {
  static get inject() {
    return ['App/Models/CampaignTag'];
  }

  constructor(campaignTagModel) {
    this.campaignTagModel = campaignTagModel;
  }

  execute() {
    return this.campaignTagModel.all();
  }
}

module.exports = ListTagsUseCase;
