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
      .get('/institutions/audit', `${this.controllersPath}/Institution/GetInstitutionsToAuditController.handle`);
    router
      .get('/institutions/:id', `${this.controllersPath}/Institution/GetInstitutionController.handle`);
    
    router
      .get('/institutions', `${this.controllersPath}/Institution/GetInstitutionsController.handle`);

    router
      .delete('/institutions/:id', `${this.controllersPath}/Institution/DeleteInstitutionController.handle`);
    
    router.get('/institutions/:id', `${this.controllersPath}/Institution/GetInstitutionController.handle`);
    
    router.get('/institution/:slug', `${this.controllersPath}/Institution/GetInstitutionBySlugController.handle`);

    router.delete('/institutions/:id', `${this.controllersPath}/Institution/DeleteInstitutionController.handle`);

    router.get('/institutions', `${this.controllersPath}/Institution/GetInstitutionsController.handle`);

    router
      .post('/institutions/:id/photos', `${this.controllersPath}/Institution/UploadPhotoController.handle`);

    router
      .delete('/institutions/:id/photos/:photoId', `${this.controllersPath}/Institution/DeletePhotoController.handle`);

    router
      .get('/institutions/:id/photos', `${this.controllersPath}/Institution/GetInstitutionPhotosController.handle`);
  }
}

module.exports = InstitutionRoutes;
