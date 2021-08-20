/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { curatorStatus } = use('App/Models/Enums/Curator');

class CuratorSchema extends Schema {
  up() {
    this.create('curators', (table) => {
      table.increments();

      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.boolean('admin').notNullable();
      table.integer('status').notNullable().defaultTo(curatorStatus.underReview);

      table.timestamps();
    });
  }

  down() {
    this.drop('curators');
  }
}

module.exports = CuratorSchema;
