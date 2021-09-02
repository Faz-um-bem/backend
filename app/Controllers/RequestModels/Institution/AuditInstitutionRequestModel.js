class AuditInstitutionRequestModel {
  constructor(auditInstitutionRequestData) {
    this.id = auditInstitutionRequestData.id;
    this.curator_id = auditInstitutionRequestData.curator_id;
    this.curator_review = auditInstitutionRequestData.curator_review;
    this.approved = auditInstitutionRequestData.approved;
  }
}

module.exports = AuditInstitutionRequestModel;
