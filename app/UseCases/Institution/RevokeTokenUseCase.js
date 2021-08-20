const BusinessException = use('App/Exceptions/BusinessException');

class RevokeTokenUseCase {
  static get inject() {
    return ['App/Models/InstitutionToken'];
  }

  constructor(institutionTokenModel) {
    this.institutionTokenModel = institutionTokenModel;
  }

  async execute({ institutionId, refreshToken }) {
    const validToken = await this.institutionTokenModel
      .query()
      .where({ institution_id: institutionId, is_revoked: false, token: refreshToken })
      .first();

    if (!validToken)
      return { success: false, data: new BusinessException('Token já revogado ou inválido') };

    validToken.merge({ is_revoked: true });

    await validToken.save();

    return { success: true, data: null };
  }
}

module.exports = RevokeTokenUseCase;
