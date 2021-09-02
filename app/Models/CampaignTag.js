const BaseModel = use('App/Models/BaseModel');

class CampaignTag extends BaseModel {
  tag() {
    return this.belongsTo('App/Models/Tag');
  }
}

module.exports = CampaignTag;
