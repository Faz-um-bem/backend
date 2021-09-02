const BaseModel = use('App/Models/BaseModel');
const Env = use('Env');

class InstitutionPhoto extends BaseModel {
  getUrl(url) {
    return `${Env.get('APP_DOMAIN')}/${url}`;
  }
}

module.exports = InstitutionPhoto;
