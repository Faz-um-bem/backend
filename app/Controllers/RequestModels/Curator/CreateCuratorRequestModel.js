class CreateCuratorRequestModel {
  constructor(createCuratorRequestData) {
    this.name = createCuratorRequestData.name;
    this.email = createCuratorRequestData.email;
    this.password = createCuratorRequestData.password;
    this.admin = createCuratorRequestData.admin;
  }
}

module.exports = CreateCuratorRequestModel;
