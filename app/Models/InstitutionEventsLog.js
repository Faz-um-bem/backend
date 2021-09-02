const BaseModel = use('App/Models/BaseModel');

class InstitutionEventsLog extends BaseModel {
  institution() {
    return this.belongsTo('App/Models/Institution');
  }
}

module.exports = InstitutionEventsLog;
