import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tariffs', (table) => {
    table.increments('id').primary();
    table.integer('period_id');
    table.integer('warehouse_id');
    table
      .foreign('period_id')
      .references('id')
      .inTable('periods')
      .onDelete('CASCADE');
    table
      .foreign('warehouse_id')
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
}
