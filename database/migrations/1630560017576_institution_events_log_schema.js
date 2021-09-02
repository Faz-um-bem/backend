/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

class InstitutionEventsLogSchema extends Schema {
  up() {
    this.create('institution_events_logs', (table) => {
      table.increments();

      table.integer('event_type', 1).notNullable();

      table.json('data');

      table.integer('status', 1).notNullable().defaultTo(eventLogStatus.underReview);

      table.text('curator_review');

      table.integer('institution_id')
        .references('id')
        .inTable('institutions')
        .notNullable()
        .onDelete('CASCADE');

      table.integer('curator_id')
        .references('id')
        .inTable('curators')
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down() {
    this.drop('institution_events_logs');
  }
}

module.exports = InstitutionEventsLogSchema;
