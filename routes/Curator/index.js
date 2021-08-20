const BaseRoutes = use('Routes/BaseRoutes');

class CuratorRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/curators', `${this.controllersPath}/Curator/CreateCuratorController.handle`)
      .validator('Curator/CreateCuratorValidator');
  }
}

module.exports = CuratorRoutes;
