const InstitutionRoutes = use('Routes/Institution');
const SessionRoutes = use('Routes/Session');

class Routes {
  static registerRoutes(router) {
    InstitutionRoutes.registerRoutes(router);
    SessionRoutes.registerRoutes(router);
  }
}

module.exports = Routes;
