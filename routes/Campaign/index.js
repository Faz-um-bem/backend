const BaseRoutes = use('Routes/BaseRoutes');

class CampaignRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/institutions/:id/campaign/', `${this.controllersPath}/Campaign/CreateCampaignController.handle`)
      .validator('Campaign/CreateCampaignValidator');

    router.get('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/GetCampaignController.handle`);
  }
}

module.exports = CampaignRoutes;
