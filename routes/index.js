const InstitutionRoutes = use('Routes/Institution');
const CampaignRoutes = use('Routes/Campaign');

class Routes {
  static registerRoutes(router) {
    InstitutionRoutes.registerRoutes(router);
    CampaignRoutes.registerRoutes(router);
  }
}

module.exports = Routes;
