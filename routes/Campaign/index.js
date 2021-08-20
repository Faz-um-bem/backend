const BaseRoutes = use('Routes/BaseRoutes');

class CampaignRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/institutions/:id/campaign/', `${this.controllersPath}/Campaign/CreateCampaignController.handle`)
      .validator('Campaign/CreateCampaignValidator');

    router.put('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/UpdateCampaignController.handle`);

    router.get('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/GetCampaignController.handle`);
    router.get('/campaigns', `${this.controllersPath}/Campaign/GetCampaignsController.handle`);
    router.get('/institutions/:id/campaigns', `${this.controllersPath}/Campaign/GetCampaignsByInstitutionController.handle`);

    router.delete('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/DeleteCampaignController.handle`);
  }
}

module.exports = CampaignRoutes;
