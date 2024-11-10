import type { Knex } from 'knex';

/**
 * Creates the `tariffs` table in the database.
 *
 * This migration defines the structure for the `tariffs` table, including:
 * - `id`: Primary key, auto-incremented.
 * - `period_id`: Foreign key referencing the `periods` table, with a cascading delete on removal of the referenced period.
 * - `warehouse_id`: Foreign key referencing the `warehouses` table, with a cascading delete on removal of the referenced warehouse.
 * - `boxDeliveryAndStorageExpr`: A decimal value for the delivery and storage expression, cannot be null.
 * - `boxDeliveryBase`: A decimal value for the base box delivery cost, cannot be null.
 * - `boxDeliveryLiter`: A decimal value for the box delivery cost per liter, cannot be null.
 * - `boxStorageBase`: A decimal value for the base box storage cost, cannot be null.
 * - `boxStorageLiter`: A decimal value for the box storage cost per liter, cannot be null.
 *
 * The `tariffs` table is used to store tariff data related to periods and warehouses.
 *
 * @param knex - The Knex instance used to interact with the database.
 * @returns A promise that resolves when the table creation is complete.
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tariffs', (table) => {
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

/**
 * Drops the `tariffs` table from the database if it exists.
 *
 * This migration is responsible for removing the `tariffs` table from the database.
 * It is typically used for rolling back the migration when no longer needed.
 *
 * @param knex - The Knex instance used to interact with the database.
 * @returns A promise that resolves when the table drop is complete.
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('tariffs');
}
