const BaseModel = use('App/Models/BaseModel');
const Env = use('Env');

class Campaign extends BaseModel {
  getLogo(logo) {
    if (!logo)
      return logo;

    return `${Env.get('APP_DOMAIN')}/${logo}`;
  }

  tags() {
    return this.hasMany('App/Models/CampaignTag');
  }

  // eslint-disable-next-line camelcase
  event_logs() {
    return this.hasMany('App/Models/CampaignEventsLog');
  }
}

module.exports = Campaign;
