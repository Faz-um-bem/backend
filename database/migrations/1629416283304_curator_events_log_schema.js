/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

class CuratorEventsLogSchema extends Schema {
  up() {
    this.create('curator_events_logs', (table) => {
      table.increments();

      table.integer('event_type').notNullable();

      table.json('data');

      table.integer('status').notNullable().defaultTo(eventLogStatus.underReview);

      table.text('curator_review');

      table.integer('curator_id')
        .references('id')
        .inTable('curators')
        .notNullable()
        .onDelete('CASCADE');

      table.integer('curator_reviewer_id')
        .references('id')
        .inTable('curators')
        .defaultTo(null)
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down() {
    this.drop('curator_events_logs');
  }
}

module.exports = CuratorEventsLogSchema;
