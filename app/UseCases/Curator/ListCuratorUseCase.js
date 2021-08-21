class ListCuratorUseCase {
  static get inject() {
    return ['App/Models/Curator'];
  }

  constructor(curatorModel) {
    this.curatorModel = curatorModel;
  }

  async execute({ page }) {
    const curator = await this.curatorModel.paginate(page, 10);

    return { success: true, data: curator };
  }
}

module.exports = ListCuratorUseCase;
