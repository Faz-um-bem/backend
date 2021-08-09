const BaseRoutes = use('Routes/BaseRoutes');

class CampaignRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/institutions/:id/campaign/', `${this.controllersPath}/Campaign/CreateCampaignController.handle`)
      .validator('Campaign/CreateCampaignValidator');
    router.put('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/UpdateCampaignController.handle`);
  }
}

module.exports = CampaignRoutes;
