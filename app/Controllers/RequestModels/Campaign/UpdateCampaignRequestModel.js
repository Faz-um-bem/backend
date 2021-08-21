class UpdateCampaignRequestModel {
  constructor(updateCampaignRequestData) {
    this.title = updateCampaignRequestData.title;
    this.description = updateCampaignRequestData.description;
    this.address = updateCampaignRequestData.address;
    this.address_number = updateCampaignRequestData.address_number;
    this.address_complement = updateCampaignRequestData.address_complement;
    this.neighborhood = updateCampaignRequestData.neighborhood;
    this.postal_code = updateCampaignRequestData.postal_code;
    this.state = updateCampaignRequestData.state;
    this.city = updateCampaignRequestData.city;
    this.address_latitude = updateCampaignRequestData.address_latitude;
    this.address_longitude = updateCampaignRequestData.address_longitude;
    this.institution_id = updateCampaignRequestData.id;
    this.id = updateCampaignRequestData.campaign_id;
  }
}

module.exports = UpdateCampaignRequestModel;
