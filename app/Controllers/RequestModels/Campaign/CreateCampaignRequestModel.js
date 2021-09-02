class CreateCampaignRequestModel {
  constructor(createCampaignRequestData) {
    this.title = createCampaignRequestData.title;
    this.description = createCampaignRequestData.description;
    this.address = createCampaignRequestData.address;
    this.address_number = createCampaignRequestData.address_number;
    this.address_complement = createCampaignRequestData.address_complement;
    this.neighborhood = createCampaignRequestData.neighborhood;
    this.postal_code = createCampaignRequestData.postal_code;
    this.state = createCampaignRequestData.state;
    this.city = createCampaignRequestData.city;
    this.address_latitude = createCampaignRequestData.address_latitude;
    this.address_longitude = createCampaignRequestData.address_longitude;
    this.institution_id = createCampaignRequestData.id;
    this.file = createCampaignRequestData.file;
  }
}

module.exports = CreateCampaignRequestModel;
