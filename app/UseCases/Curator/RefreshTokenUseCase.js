const BusinessException = use('App/Exceptions/BusinessException');
const { userType } = use('App/Models/Enums/UserType');

class RefreshTokenUseCase {
  static get inject() {
    return ['App/Models/CuratorToken', 'App/Models/Curator', 'App/Models/Shared/UnitOfWork', 'Jwt', 'Uuid'];
  }

  constructor(curatorTokenModel, curatorModel, uow, jwtProvider, uuidProvider) {
    this.curatorTokenModel = curatorTokenModel;
    this.curatorModel = curatorModel;
    this.uow = uow;
    this.jwtProvider = jwtProvider;
    this.uuidProvider = uuidProvider;
  }

  async execute({ refreshToken, curatorId }) {
    try {
      await this.uow.startTransaction();

      const validRefreshToken = await this.curatorTokenModel
        .query()
        .where(
          { is_revoked: false, token: refreshToken, curator_id: curatorId },
        )
        .first();

      if (!validRefreshToken) { return { success: false, data: new BusinessException('Token inválido') }; }

      const token = await this.jwtProvider.sign({
        payload: {
          id: curatorId,
          type: userType.curator,
        },
      });

      const newRefreshToken = this.uuidProvider.create();

      validRefreshToken.merge({ is_revoked: true });

      await validRefreshToken.save(this.uow.transaction);

      await this.curatorTokenModel.create({
        token: newRefreshToken,
        type: 'jwt_refresh_token',
        curator_id: curatorId,
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
