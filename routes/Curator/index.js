const BaseRoutes = use('Routes/BaseRoutes');

class CuratorRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .post('/curators', `${this.controllersPath}/Curator/CreateCuratorController.handle`)
      .validator('Curator/CreateCuratorValidator');

    router
      .put('/curators/:id/audit', `${this.controllersPath}/Curator/AuditCuratorController.handle`);

    router
      .get('/curators/:id', `${this.controllersPath}/Curator/GetCuratorController.handle`);

    router
      .get('/curators', `${this.controllersPath}/Curator/ListCuratorController.handle`);

    router
      .delete('/curators/:id', `${this.controllersPath}/Curator/DeleteCuratorController.handle`);

    router
      .put('/curators/:id', `${this.controllersPath}/Curator/UpdateCuratorController.handle`)
      .validator('Curator/UpdateCuratorValidator');
  }
}

module.exports = CuratorRoutes;
