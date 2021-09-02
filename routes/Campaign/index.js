const BaseRoutes = use('Routes/BaseRoutes');

class CampaignRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/institutions/:id/campaign/', `${this.controllersPath}/Campaign/CreateCampaignController.handle`)
      .validator('Campaign/CreateCampaignValidator');
    router
      .post('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/RequestCampaignUpdateController.handle`)
      .validator('Campaign/RequestCampaignUpdateValidator');

    router
      .put('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/AuditCampaignController.handle`);

    router.get('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/GetCampaignController.handle`);
    router.get('/campaigns', `${this.controllersPath}/Campaign/GetCampaignsController.handle`);
    router.get('/institutions/:id/campaigns', `${this.controllersPath}/Campaign/GetCampaignsByInstitutionController.handle`);
    router.get('campaign/:slug', `${this.controllersPath}/Campaign/GetCampaignBySlugController.handle`);

    router.delete('/institutions/:id/campaign/:campaign_id', `${this.controllersPath}/Campaign/DeleteCampaignController.handle`);

    router
      .post('/campaigns/:id/photos', `${this.controllersPath}/Campaign/UploadPhotoController.handle`);

    router
      .delete('/campaigns/:id/photos/:photoId', `${this.controllersPath}/Campaign/DeletePhotoController.handle`);

    router
      .get('/campaigns/:id/photos', `${this.controllersPath}/Campaign/GetCampaignPhotosController.handle`);
  }
}

module.exports = CampaignRoutes;
