/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CampaignTagsSchema extends Schema {
  up() {
    this.create('campaign_tags', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('campaign_tags');
  }
}

module.exports = CampaignTagsSchema;
