const BusinessException = use('App/Exceptions/BusinessException');

class CuratorHook {
  static get inject() {
    return ['App/Models/Curator'];
  }

  constructor(curatorModel) {
    this.curatorModel = curatorModel;
  }

  async verifyEmailExists(curator) {
    const emailExist = await this.curatorModel
      .query()
      .where('email', curator.email)
      .andWhere('id', '!=', curator.id)
      .first();

    if (emailExist) {
      throw new BusinessException('O e-mail já está em uso');
    }
  }
}

module.exports = CuratorHook;
