const BusinessException = use('App/Exceptions/BusinessException');

class LoginUseCase {
  static get inject() {
    return ['App/Models/Institution', 'App/Models/InstitutionToken', 'Jwt', 'Hash', 'Uuid'];
  }

  constructor(institutionModel, institutionTokenModel, jwtProvider, hashProvider, uuidProvider) {
    this.institutionModel = institutionModel;
    this.institutionTokenModel = institutionTokenModel;
    this.jwtProvider = jwtProvider;
    this.hashProvider = hashProvider;
    this.uuidProvider = uuidProvider;
  }

  async execute({ email, password }) {
    const institution = await this.institutionModel
      .query()
      .select(['id', 'email', 'password'])
      .where('email', email)
      .first();

    if (!institution) { return { success: false, data: new BusinessException('Não existe instituição cadastrada com esse e-mail') }; }

    const validPassword = await this.hashProvider.verify(password, institution.password);

    if (!validPassword) { return { success: false, data: new BusinessException('Senha incorreta') }; }

    const token = await this.jwtProvider.sign({
      payload: {
        id: institution.id,
        type: 'institution',
      },
    });

    const refreshToken = this.uuidProvider.create();

    await this.institutionTokenModel.create({
      token: refreshToken,
      type: 'jwt_refresh_token',
      institution_id: institution.id,
      is_revoked: false,
    });

    return { success: true, data: { token, refreshToken } };
  }
}

module.exports = LoginUseCase;
