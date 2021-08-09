const BaseRoutes = use('Routes/BaseRoutes');

class InstitutionRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/institutions', `${this.controllersPath}/Institution/CreateInstitutionController.handle`)
      .validator('Institution/CreateInstitutionValidator');

    router.get('/institutions/:id', `${this.controllersPath}/Institution/GetInstitutionController.handle`);

    router
      .post('/institutions/login', `${this.controllersPath}/Institution/LoginController.handle`);
  }
}

module.exports = InstitutionRoutes;
