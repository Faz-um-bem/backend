const BaseRoutes = use('Routes/BaseRoutes');

class SessionRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/login', `${this.controllersPath}/Session/LoginController.handle`)
      .validator('Session/LoginValidator');

    router
      .post('/refreshToken', `${this.controllersPath}/Session/RefreshTokenController.handle`)
      .validator('Session/RefreshTokenValidator');

    router
      .post('/revokeToken', `${this.controllersPath}/Session/RevokeTokenController.handle`)
      .validator('Session/RevokeTokenValidator');
  }
}

module.exports = SessionRoutes;
