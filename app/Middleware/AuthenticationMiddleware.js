class AuthenticationMiddleware {
  static get inject() {
    return ['Jwt'];
  }

  constructor(jwtProvider) {
    this.jwtProvider = jwtProvider;
  }

  // eslint-disable-next-line consistent-return
  async handle({ request, response }, next, properties) {
    try {
      const jwtToken = request.header('Authorization');

      if (!jwtToken) {
        response.status(401).json({
          message: 'Necessário informar um token de autenticação',
          data: null,
        });

        return;
      }

      const [tokenType, plainToken] = jwtToken.split(' ');

      if (tokenType !== 'Bearer')
        throw new Error();

      await this.jwtProvider.verify({ token: plainToken });

      if (properties.length > 0)
        this.validateTokenUserType({ token: plainToken, userType: properties[0] });

      await next();
    } catch (error) {
      response.status(401);

      response.json({
        message: 'Token inválido',
        data: null,
      });
    }
  }

  validateTokenUserType({ token, userType }) {
    const jwtDecoded = this.jwtProvider.decode({ token });

    if (jwtDecoded.type !== userType)
      throw new Error();
  }
}

module.exports = AuthenticationMiddleware;
