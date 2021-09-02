const BaseModel = use('App/Models/BaseModel');

class CampaignEventsLog extends BaseModel {
  campaign() {
    return this.belongsTo('App/Models/Campaign');
  }
}

module.exports = CampaignEventsLog;
