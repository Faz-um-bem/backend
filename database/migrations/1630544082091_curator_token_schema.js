/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CuratorTokenSchema extends Schema {
  up() {
    this.create('curator_tokens', (table) => {
      table.increments();
      table.integer('curator_id').unsigned().references('id').inTable('curators')
        .onDelete('CASCADE');
      table.string('token', 255).notNullable().unique().index();
      table.string('type', 80).notNullable();
      table.boolean('is_revoked').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('curator_tokens');
  }
}

module.exports = CuratorTokenSchema;
