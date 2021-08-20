/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class InstitutionToken extends Model {
  institutions() {
    return this.belongsTo('App/Models/Institution');
  }
}

module.exports = InstitutionToken;
