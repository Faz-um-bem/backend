const NotFoundException = use('App/Exceptions/NotFoundException');

class DeleteCuratorUseCase {
  static get inject() {
    return ['App/Models/Curator'];
  }

  constructor(curatorModel) {
    this.curatorModel = curatorModel;
  }

  async execute(curatorId) {
    const curator = await this.curatorModel.find(curatorId);

    if (!curator) {
      return { success: false, data: new NotFoundException('Curador não encontrado') };
    }

    await curator.delete();

    return { success: true, data: null };
  }
}

module.exports = DeleteCuratorUseCase;
