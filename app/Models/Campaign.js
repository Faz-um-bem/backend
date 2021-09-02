const BaseModel = use('App/Models/BaseModel');
const Env = use('Env');

class Campaign extends BaseModel {
  getLogo(logo) {
    if (!logo)
      return logo;

    return `${Env.get('APP_DOMAIN')}/${logo}`;
  }
}

module.exports = Campaign;
