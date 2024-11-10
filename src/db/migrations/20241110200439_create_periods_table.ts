import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('periods', (table) => {
    table.increments('id').primary();
    table.date('dtNextBox').notNullable();
    table.date('dtTillMax').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('periods');
}
