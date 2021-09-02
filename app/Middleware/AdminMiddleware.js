const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const { userType } = use('App/Models/Enums/UserType');

class AdminMiddleware {
  static get inject() {
    return ['App/Models/Curator', 'Jwt'];
  }

  constructor(curatorModel, jwtProvider) {
    this.curatorModel = curatorModel;
    this.jwtProvider = jwtProvider;
  }

  // eslint-disable-next-line consistent-return
  async handle({ request, response }, next) {
    try {
      const jwtToken = request.header('Authorization');

      const [, plainToken] = jwtToken.split(' ');

      const { id, type } = this.jwtProvider.decode({ token: plainToken });

      if (type !== userType.curator)
        throw new UnauthorizedException('Usuário não é um curador');

      const curator = await this.curatorModel
        .query()
        .select(['admin'])
        .where({ id })
        .first();

      if (!curator || !curator.admin)
        throw new UnauthorizedException('Curador precisa ser um administrador do sistema');

      await next();
    } catch (error) {
      response
        .status(error.status || 500)
        .json({
          message: error.message,
          data: null,
        });
    }
  }
}

module.exports = AdminMiddleware;
