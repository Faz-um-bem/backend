const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const BusinessException = use('App/Exceptions/BusinessException');
const { userType } = use('App/Models/Enums/UserType');

class IsYourselfMiddleware {
  static get inject() {
    return ['App/Models/Curator', 'Jwt'];
  }

  constructor(curatorModel, jwtProvider) {
    this.curatorModel = curatorModel;
    this.jwtProvider = jwtProvider;
  }

  // eslint-disable-next-line consistent-return
  async handle({ request, response, params }, next, properties) {
    try {
      const jwtToken = request.header('Authorization');
      if (!jwtToken)
        throw new BusinessException('Necessário informar token de acesso');

      const [, plainToken] = jwtToken.split(' ');

      const { id, type } = this.jwtProvider.decode({ token: plainToken });

      let adminCurator = null;

      if (type === userType.curator)
        adminCurator = await this.curatorModel.query().where({ id, admin: true }).first();

      // eslint-disable-next-line eqeqeq
      if (params[properties[0]] != id && !adminCurator) {
        throw new UnauthorizedException('Somente o próprio usuário ou administrador do sistema podem acessar este recurso');
      }

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

module.exports = IsYourselfMiddleware;
