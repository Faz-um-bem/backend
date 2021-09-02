/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CampaignPhotosSchema extends Schema {
  up() {
    this.create('campaign_photos', (table) => {
      table.increments();
      table.text('url').notNullable();
      table.integer('campaign_id')
        .notNullable()
        .references('id')
        .inTable('campaigns')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('campaign_photos');
  }
}

module.exports = CampaignPhotosSchema;
