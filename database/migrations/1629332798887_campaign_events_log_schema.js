'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { eventLogStatus } = use('App/Models/Enums/EventsLogs');

class CampaignEventsLogSchema extends Schema {
  up () {
    this.create('campaign_events_logs', (table) => {
      table.increments();
      table.integer('event_type').notNullable();
      table.json('data');
      table.integer('status').notNullable().defaultTo(eventLogStatus.UnderReview);
      table.text('curator_review');

      table.integer('campaign_id')
        .notNullable()
        .references('id')
        .inTable('campaigns');


      table.timestamps();
    })
  }

  down () {
    this.drop('campaign_events_logs')
  }
}

module.exports = CampaignEventsLogSchema
