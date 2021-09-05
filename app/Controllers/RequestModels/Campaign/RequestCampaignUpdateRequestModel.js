class RequestCampaignUpdateRequestModel {
  constructor(requestCampaignUpdateRequestModel) {
    this.id = requestCampaignUpdateRequestModel.campaign_id;
    this.title = requestCampaignUpdateRequestModel.title;
    this.description = requestCampaignUpdateRequestModel.description;
    this.address = requestCampaignUpdateRequestModel.address;
    this.address_number = requestCampaignUpdateRequestModel.address_number;
    this.address_complement = requestCampaignUpdateRequestModel.address_complement;
    this.neighborhood = requestCampaignUpdateRequestModel.neighborhood;
    this.postal_code = requestCampaignUpdateRequestModel.postal_code;
    this.state = requestCampaignUpdateRequestModel.state;
    this.city = requestCampaignUpdateRequestModel.city;
    this.address_latitude = requestCampaignUpdateRequestModel.address_latitude;
    this.address_longitude = requestCampaignUpdateRequestModel.address_longitude;
    this.institution_id = requestCampaignUpdateRequestModel.id;
    this.file = requestCampaignUpdateRequestModel.file;
    this.tags = requestCampaignUpdateRequestModel.tags;
  }
}

module.exports = RequestCampaignUpdateRequestModel;
