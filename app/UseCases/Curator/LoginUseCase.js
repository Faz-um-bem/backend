const BusinessException = use('App/Exceptions/BusinessException');
const { userType } = use('App/Models/Enums/UserType');

class LoginUseCase {
  static get inject() {
    return ['App/Models/Curator', 'App/Models/CuratorToken', 'Jwt', 'Hash', 'Uuid'];
  }

  constructor(curatorModel, curatorTokenModel, jwtProvider, hashProvider, uuidProvider) {
    this.curatorModel = curatorModel;
    this.curatorTokenModel = curatorTokenModel;
    this.jwtProvider = jwtProvider;
    this.hashProvider = hashProvider;
    this.uuidProvider = uuidProvider;
  }

  async execute({ email, password }) {
    const curator = await this.curatorModel
      .query()
      .select(['id', 'email', 'password'])
      .where('email', email)
      .first();

    if (!curator) { return { success: false, data: new BusinessException('Não existe curador cadastrado com esse e-mail') }; }

    const validPassword = await this.hashProvider.verify(password, curator.password);

    if (!validPassword) { return { success: false, data: new BusinessException('Senha incorreta') }; }

    const token = await this.jwtProvider.sign({
      payload: {
        id: curator.id,
        type: userType.curator,
      },
    });

    const refreshToken = this.uuidProvider.create();

    await this.curatorTokenModel.create({
      token: refreshToken,
      type: 'jwt_refresh_token',
      curator_id: curator.id,
      is_revoked: false,
    });

    return { success: true, data: { token, refreshToken } };
  }
}

module.exports = LoginUseCase;
