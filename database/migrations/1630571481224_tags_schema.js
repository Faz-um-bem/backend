/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CampaignTagsSchema extends Schema {
  up() {
    this.create('tags', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('tags');
  }
}

module.exports = CampaignTagsSchema;
