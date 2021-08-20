const BusinessException = use('App/Exceptions/BusinessException');

class RefreshTokenUseCase {
  static get inject() {
    return ['App/Models/InstitutionToken', 'App/Models/Institution', 'App/Models/Shared/UnitOfWork', 'Jwt', 'Uuid'];
  }

  constructor(institutionTokenModel, institutionModel, uow, jwtProvider, uuidProvider) {
    this.institutionTokenModel = institutionTokenModel;
    this.institutionModel = institutionModel;
    this.uow = uow;
    this.jwtProvider = jwtProvider;
    this.uuidProvider = uuidProvider;
  }

  async execute({ refreshToken, institutionId }) {
    try {
      await this.uow.startTransaction();

      const validRefreshToken = await this.institutionTokenModel
        .query()
        .where(
          { is_revoked: false, token: refreshToken, institution_id: institutionId },
        )
        .first();

      if (!validRefreshToken) { return { success: false, data: new BusinessException('Token inválido') }; }

      const token = await this.jwtProvider.sign({ payload: { id: institutionId, type: 'institution' } });

      const newRefreshToken = this.uuidProvider.create();

      validRefreshToken.merge({ is_revoked: true });

      await validRefreshToken.save(this.uow.transaction);

      await this.institutionTokenModel.create({
        token: newRefreshToken,
        type: 'jwt_refresh_token',
        institution_id: institutionId,
        is_revoked: false,
      }, this.uow.transaction);

      await this.uow.commitTransaction();

      return { success: true, data: { token, refreshToken: newRefreshToken } };
    } catch (error) {
      await this.uow.rollbackTransaction();

      throw error;
    }
  }
}

module.exports = RefreshTokenUseCase;
