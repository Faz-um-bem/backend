const BusinessException = use('App/Exceptions/BusinessException');

class RevokeTokenUseCase {
  static get inject() {
    return ['App/Models/CuratorToken'];
  }

  constructor(curatorTokenModel) {
    this.curatorTokenModel = curatorTokenModel;
  }

  async execute({ curatorId, refreshToken }) {
    const validToken = await this.curatorTokenModel
      .query()
      .where({ curator_id: curatorId, is_revoked: false, token: refreshToken })
      .first();

    if (!validToken)
      return { success: false, data: new BusinessException('Token já revogado ou inválido') };

    validToken.merge({ is_revoked: true });

    await validToken.save();

    return { success: true, data: null };
  }
}

module.exports = RevokeTokenUseCase;
