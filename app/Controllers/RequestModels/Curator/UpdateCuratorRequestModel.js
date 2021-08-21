class UpdateCuratorRequestModel {
  constructor(updateCuratorRequestData) {
    this.id = updateCuratorRequestData.id;
    this.name = updateCuratorRequestData.name;
    this.email = updateCuratorRequestData.email;
    this.password = updateCuratorRequestData.password;
    this.admin = updateCuratorRequestData.admin;
  }
}

module.exports = UpdateCuratorRequestModel;
