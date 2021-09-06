class AuditCuratorRequestModel {
  constructor(createCuratorRequestData) {
    this.id = createCuratorRequestData.id;
    this.curator_reviewer_id = createCuratorRequestData.curator_reviewer_id;
    this.curator_review = createCuratorRequestData.curator_review;
    this.approved = createCuratorRequestData.approved;
  }
}

module.exports = AuditCuratorRequestModel;
