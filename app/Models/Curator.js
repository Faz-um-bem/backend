const BaseModel = use('App/Models/BaseModel');

class Curator extends BaseModel {
  static get hiddenFields() {
    return [...super.hiddenFields, 'password'];
  }

  // eslint-disable-next-line camelcase
  event_logs() {
    return this.hasMany('App/Models/CuratorEventsLog');
  }
}

module.exports = Curator;
