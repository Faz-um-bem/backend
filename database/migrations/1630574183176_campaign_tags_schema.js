/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CampaignTagsSchema extends Schema {
  up() {
    this.create('campaign_tags', (table) => {
      table.increments();
      table.integer('campaign_id')
        .notNullable()
        .references('id')
        .inTable('campaigns')
        .onDelete('CASCADE')
        .notNullable();
      table.integer('tag_id')
        .notNullable()
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('campaign_tags');
  }
}

module.exports = CampaignTagsSchema;
