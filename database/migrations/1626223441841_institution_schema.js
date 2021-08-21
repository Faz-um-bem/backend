/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InstitutionSchema extends Schema {
  up() {
    this.create('institutions', (table) => {
      table.increments();

      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('name').notNullable().unique();
      table.string('corporate_name').notNullable();
      table.string('slug').notNullable().unique();
      table.string('cnpj', 14).notNullable();
      table.text('description').notNullable();

      table.string('address').notNullable();
      table.string('address_number').notNullable();
      table.string('address_complement');
      table.string('neighborhood').notNullable();
      table.string('postal_code').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('address_longitude').notNullable();
      table.string('address_latitude').notNullable();

      table.string('main_phone', 11).notNullable();
      table.string('secondary_phone', 11);
      table.string('whatsapp_phone', 11);

      table.integer('status').notNullable();

      table.string('logo');

      table.string('slug').notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('institutions');
  }
}

module.exports = InstitutionSchema;
