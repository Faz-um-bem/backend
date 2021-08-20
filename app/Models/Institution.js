const BaseModel = use('App/Models/BaseModel');
class Institution extends BaseModel {
  static get hiddenFields() {
    return [...super.hiddenFields, 'password'];
  }
}

module.exports = Institution;
