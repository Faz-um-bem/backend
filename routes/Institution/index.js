const BaseRoutes = use('Routes/BaseRoutes');

class InstitutionRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/institutions', `${this.controllersPath}/Institution/CreateInstitutionController.handle`)
      .validator('Institution/CreateInstitutionValidator');
    router
      .post('institutions/:id/update-request', `${this.controllersPath}/Institution/RequestInstitutionUpdateController.handle`)
      .validator('Institution/RequestInstitutionUpdateValidator');

    router
      .put('institutions/:id', `${this.controllersPath}/Institution/AuditInstitutionController.handle`)
      .validator('Institution/AuditInstitutionValidator');

    router
      .get('/institutions/:id', `${this.controllersPath}/Institution/GetInstitutionController.handle`);
    router
      .get('/institutions', `${this.controllersPath}/Institution/GetInstitutionsController.handle`);

    router
      .delete('/institutions/:id', `${this.controllersPath}/Institution/DeleteInstitutionController.handle`);
  }
}

module.exports = InstitutionRoutes;
