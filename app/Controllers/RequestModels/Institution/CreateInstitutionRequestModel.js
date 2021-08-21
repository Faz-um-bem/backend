class InstitutionLogo {
  constructor(logoData) {
    this.value = logoData.value;
    this.size = logoData.size;
    this.name = logoData.name;
    this.type = logoData.type;
  }
}

class CreateInstitutionRequestModel {
  constructor(createInstitutionRequestData) {
    this.email = createInstitutionRequestData.email;
    this.password = createInstitutionRequestData.password;
    this.name = createInstitutionRequestData.name;
    this.corporate_name = createInstitutionRequestData.corporate_name;
    this.cnpj = createInstitutionRequestData.cnpj;
    this.description = createInstitutionRequestData.description;
    this.address = createInstitutionRequestData.address;
    this.address_number = createInstitutionRequestData.address_number;
    this.address_complement = createInstitutionRequestData.address_complement;
    this.neighborhood = createInstitutionRequestData.neighborhood;
    this.postal_code = createInstitutionRequestData.postal_code;
    this.state = createInstitutionRequestData.state;
    this.city = createInstitutionRequestData.city;
    this.address_latitude = createInstitutionRequestData.address_latitude;
    this.address_longitude = createInstitutionRequestData.address_longitude;
    this.main_phone = createInstitutionRequestData.main_phone;
    this.secondary_phone = createInstitutionRequestData.secondary_phone;
    this.whatsapp_phone = createInstitutionRequestData.whatsapp_phone;
    this.file = createInstitutionRequestData.file
      ? new InstitutionLogo(createInstitutionRequestData.file)
      : undefined;
  }
}

module.exports = CreateInstitutionRequestModel;
