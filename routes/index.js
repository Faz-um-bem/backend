const InstitutionRoutes = use('Routes/Institution');
const CuratorRoutes = use('Routes/Curator');
const CampaignRoutes = use('Routes/Campaign');
const SessionRoutes = use('Routes/Session');
const TagRoutes = use('Routes/Tag');
const InstitutionCuratorRoutes = use('Routes/InstitutionCurator');

class Routes {
  static registerRoutes(router) {
    InstitutionRoutes.registerRoutes(router);
    CuratorRoutes.registerRoutes(router);
    CampaignRoutes.registerRoutes(router);
    SessionRoutes.registerRoutes(router);
    TagRoutes.registerRoutes(router);
    InstitutionCuratorRoutes.registerRoutes(router);
  }
}

module.exports = Routes;
