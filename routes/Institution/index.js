const BaseRoutes = use('Routes/BaseRoutes');

class InstitutionRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/institutions', `${this.controllersPath}/Institution/CreateInstitutionController.handle`)
      .validator('Institution/CreateInstitutionValidator');

    router.put('institutions/:id', `${this.controllersPath}/Institution/UpdateInstitutionController.handle`)
      .validator('Institution/UpdateInstitutionValidator');

    router.get('/institutions/:id', `${this.controllersPath}/Institution/GetInstitutionController.handle`);
    router.get('/institution/:slug', `${this.controllersPath}/Institution/GetInstitutionBySlugController.handle`);

    router.delete('/institutions/:id', `${this.controllersPath}/Institution/DeleteInstitutionController.handle`);

    router.get('/institutions', `${this.controllersPath}/Institution/GetInstitutionsController.handle`);
  }
}

module.exports = InstitutionRoutes;
