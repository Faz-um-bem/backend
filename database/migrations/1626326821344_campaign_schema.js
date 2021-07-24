/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CampaignSchema extends Schema {
  up() {
    this.create('campaigns', (table) => {
      table.increments();

      table.string('title').notNullable();
      table.string('description');
      table.string('address').notNullable();
      table.string('address_number').notNullable();
      table.string('address_complement');
      table.string('neighborhood').notNullable();
      table.string('postal_code').notNullable();
      table.string('state').notNullable();
      table.string('city').notNullable();
      table.string('address_latitude').notNullable();
      table.string('address_longitude').notNullable();

      table.integer('status').notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('campaigns');
  }
}

module.exports = CampaignSchema;
