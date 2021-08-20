const NotFoundException = use('App/Exceptions/NotFoundException');

class ListCuratorUseCase {
  static get inject() {
    return ['App/Models/Curator'];
  }

  constructor(curatorModel) {
    this.curatorModel = curatorModel;
  }

  async execute() {
    const curator = await this.curatorModel.all();

    if (!curator) {
      return { success: false, data: new NotFoundException('Nenhum curador foi encontrado') };
    }

    return { success: true, data: curator };
  }
}

module.exports = ListCuratorUseCase;
