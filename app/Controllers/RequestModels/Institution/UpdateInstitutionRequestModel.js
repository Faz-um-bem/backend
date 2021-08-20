class UpdateInstitutionRequestModel {
  constructor(updateInstitutionRequestData) {
    this.email = updateInstitutionRequestData.email;
    this.password = updateInstitutionRequestData.password;
    this.name = updateInstitutionRequestData.name;
    this.corporate_name = updateInstitutionRequestData.corporate_name;
    this.cnpj = updateInstitutionRequestData.cnpj;
    this.description = updateInstitutionRequestData.description;
    this.address = updateInstitutionRequestData.address;
    this.address_number = updateInstitutionRequestData.address_number;
    this.address_complement = updateInstitutionRequestData.address_complement;
    this.neighborhood = updateInstitutionRequestData.neighborhood;
    this.postal_code = updateInstitutionRequestData.postal_code;
    this.state = updateInstitutionRequestData.state;
    this.city = updateInstitutionRequestData.city;
    this.address_latitude = updateInstitutionRequestData.address_latitude;
    this.address_longitude = updateInstitutionRequestData.address_longitude;
    this.main_phone = updateInstitutionRequestData.main_phone;
    this.secondary_phone = updateInstitutionRequestData.secondary_phone;
    this.whatsapp_phone = updateInstitutionRequestData.whatsapp_phone;
    this.id = updateInstitutionRequestData.id;
  }
}

module.exports = UpdateInstitutionRequestModel;
