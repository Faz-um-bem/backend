/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InstitutionPhotosSchema extends Schema {
  up() {
    this.create('institution_photos', (table) => {
      table.increments();
      table.text('url').notNullable();
      table.integer('institution_id')
        .notNullable()
        .references('id')
        .inTable('institutions')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('institution_photos');
  }
}

module.exports = InstitutionPhotosSchema;
