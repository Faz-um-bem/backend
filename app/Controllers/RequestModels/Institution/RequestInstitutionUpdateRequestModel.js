class RequestInstitutionUpdateRequestModel {
  constructor(requestInstitutionUpdateRequestData) {
    this.email = requestInstitutionUpdateRequestData.email;
    this.password = requestInstitutionUpdateRequestData.password;
    this.name = requestInstitutionUpdateRequestData.name;
    this.corporate_name = requestInstitutionUpdateRequestData.corporate_name;
    this.cnpj = requestInstitutionUpdateRequestData.cnpj;
    this.description = requestInstitutionUpdateRequestData.description;
    this.address = requestInstitutionUpdateRequestData.address;
    this.address_number = requestInstitutionUpdateRequestData.address_number;
    this.address_complement = requestInstitutionUpdateRequestData.address_complement;
    this.neighborhood = requestInstitutionUpdateRequestData.neighborhood;
    this.postal_code = requestInstitutionUpdateRequestData.postal_code;
    this.state = requestInstitutionUpdateRequestData.state;
    this.city = requestInstitutionUpdateRequestData.city;
    this.address_latitude = requestInstitutionUpdateRequestData.address_latitude;
    this.address_longitude = requestInstitutionUpdateRequestData.address_longitude;
    this.main_phone = requestInstitutionUpdateRequestData.main_phone;
    this.secondary_phone = requestInstitutionUpdateRequestData.secondary_phone;
    this.whatsapp_phone = requestInstitutionUpdateRequestData.whatsapp_phone;
    this.id = requestInstitutionUpdateRequestData.id;
    this.logo = requestInstitutionUpdateRequestData.logo;
  }
}

module.exports = RequestInstitutionUpdateRequestModel;
