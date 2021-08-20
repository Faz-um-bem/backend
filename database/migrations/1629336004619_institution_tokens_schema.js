/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InstitutionTokensSchema extends Schema {
  up() {
    this.create('institution_tokens', (table) => {
      table.increments();
      table.integer('institution_id').unsigned().references('id').inTable('institutions');
      table.string('token', 255).notNullable().unique().index();
      table.string('type', 80).notNullable();
      table.boolean('is_revoked').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('institution_tokens');
  }
}

module.exports = InstitutionTokensSchema;
