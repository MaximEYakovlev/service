import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('warehouses', (table) => {
    table.increments('id').primary();
    table.string('warehouseName', 100).notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('warehouses');
}
