class ListCuratorUseCase {
  static get inject() {
    return ['App/Models/Curator'];
  }

  constructor(curatorModel) {
    this.curatorModel = curatorModel;
  }

  async execute(requestData) {
    const curator = await this.curatorModel.paginate(requestData.page, 10);

    return { success: true, data: curator };
  }
}

module.exports = ListCuratorUseCase;
