const InstitutionRoutes = use('Routes/Institution');
const CampaignRoutes = use('Routes/Campaign');
const SessionRoutes = use('Routes/Session');

class Routes {
  static registerRoutes(router) {
    InstitutionRoutes.registerRoutes(router);
    CampaignRoutes.registerRoutes(router);
    SessionRoutes.registerRoutes(router);
  }
}

module.exports = Routes;
