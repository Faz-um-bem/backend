const BaseRoutes = use('Routes/BaseRoutes');

class InstitutionRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router.post('/institutions', `${this.controllersPath}/Institution/CreateInstitutionController.handle`);
  }
}

module.exports = InstitutionRoutes;
