const BaseRoutes = use('Routes/BaseRoutes');

class InstitutionCuratorRoutes extends BaseRoutes {
  static registerRoutes(router) {
    router
      .put('/password/:id', `${this.controllersPath}/InstitutionCurator/UpdatePasswordController.handle`)
      .validator('InstitutionCurator/UpdatePasswordValidator');
  }
}

module.exports = InstitutionCuratorRoutes;
