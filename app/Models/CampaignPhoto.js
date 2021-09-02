const BaseModel = use('App/Models/BaseModel');
const Env = use('Env');

class CampaignPhoto extends BaseModel {
  getUrl(url) {
    return `${Env.get('APP_DOMAIN')}/${url}`;
  }
}

module.exports = CampaignPhoto;
