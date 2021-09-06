const BaseModel = use('App/Models/BaseModel');

class CuratorEventsLog extends BaseModel {
  curator() {
    return this.belongsTo('App/Models/Curator');
  }
}

module.exports = CuratorEventsLog;
