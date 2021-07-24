const BaseRoutes = use('Routes/BaseRoutes');

class CampaignRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/campaign', `${this.controllersPath}/Campaign/CreateCampaignController.handle`)
      .validator('Campaign/CreateCampaignValidator');
  }
}

module.exports = CampaignRoutes;
