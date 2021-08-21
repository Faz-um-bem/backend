const BaseModel = use('App/Models/BaseModel');

class Curator extends BaseModel {
  static get hiddenFields() {
    return [...super.hiddenFields, 'password'];
  }
}

module.exports = Curator;
