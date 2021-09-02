const InstitutionRoutes = use('Routes/Institution');
const CuratorRoutes = use('Routes/Curator');
const CampaignRoutes = use('Routes/Campaign');
const SessionRoutes = use('Routes/Session');
const CampaignTagRoutes = use('Routes/CampaignTag');

class Routes {
  static registerRoutes(router) {
    InstitutionRoutes.registerRoutes(router);
    CuratorRoutes.registerRoutes(router);
    CampaignRoutes.registerRoutes(router);
    SessionRoutes.registerRoutes(router);
    CampaignTagRoutes.registerRoutes(router);
  }
}

module.exports = Routes;
