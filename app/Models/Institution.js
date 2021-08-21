const BaseModel = use('App/Models/BaseModel');
const Env = use('Env');
class Institution extends BaseModel {
  static get hiddenFields() {
    return [...super.hiddenFields, 'password'];
  }

  getLogo(logo) {
    if (!logo)
      return logo;

    return `${Env.get('APP_DOMAIN')}/${logo}`;
  }
}

module.exports = Institution;
