class AuditCampaignRequestModel {
  constructor(auditCampaignRequestModel) {
    this.id = auditCampaignRequestModel.campaign_id;
    this.curator_id = auditCampaignRequestModel.curator_id;
    this.curator_review = auditCampaignRequestModel.curator_review;
    this.approved = auditCampaignRequestModel.approved;
  }
}

module.exports = AuditCampaignRequestModel;
