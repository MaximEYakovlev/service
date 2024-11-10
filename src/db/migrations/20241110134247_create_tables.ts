import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('periods', (table) => {
    table.increments('id').primary();
    table.date('dtNextBox').notNullable();
    table.date('dtTillMax').notNullable();
  });

  await knex.schema.createTable('warehouses', (table) => {
    table.increments('id').primary();
    table.string('warehouseName', 100).notNullable().unique();
  });

  await knex.schema.createTable('tariffs', (table) => {
    table.increments('id').primary();
    table
      .integer('period_id')
      .references('id')
      .inTable('periods')
      .onDelete('CASCADE');
    table
      .integer('warehouse_id')
      .references('id')
      .inTable('warehouses')
      .onDelete('CASCADE');
    table.decimal('boxDeliveryAndStorageExpr').notNullable();
    table.decimal('boxDeliveryBase').notNullable();
    table.decimal('boxDeliveryLiter').notNullable();
    table.decimal('boxStorageBase').notNullable();
    table.decimal('boxStorageLiter').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('tariffs');
  await knex.schema.dropTableIfExists('warehouses');
  await knex.schema.dropTableIfExists('periods');
}
