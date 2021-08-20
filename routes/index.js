const InstitutionRoutes = use('Routes/Institution');
const CuratorRoutes = use('Routes/Curator');

class Routes {
  static registerRoutes(router) {
    InstitutionRoutes.registerRoutes(router);
    CuratorRoutes.registerRoutes(router);
  }
}

module.exports = Routes;
