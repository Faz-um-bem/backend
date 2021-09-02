const BaseRoutes = use('Routes/BaseRoutes');

class CampaignTagRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router.get('/tags', `${this.controllersPath}/Tag/ListTagsController.handle`);
  }
}

module.exports = CampaignTagRoutes;
