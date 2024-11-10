import type { Knex } from 'knex';

/**
 * Creates the `warehouses` table in the database.
 *
 * This migration defines the structure for the `warehouses` table, including:
 * - `id`: Primary key, auto-incremented.
 * - `warehouseName`: A string field that is unique and cannot be null.
 *
 * The `warehouses` table is used to store information about warehouses, where each
 * warehouse has a unique name and a unique identifier.
 *
 * @param knex - The Knex instance used to interact with the database.
 * @returns A promise that resolves when the table creation is complete.
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('warehouses', (table) => {
    table.increments('id').primary();
    table.string('warehouseName', 100).notNullable().unique();
  });
}

/**
 * Drops the `warehouses` table from the database if it exists.
 *
 * This migration is responsible for removing the `warehouses` table from the database.
 * It is typically used for rolling back the migration when no longer needed.
 *
 * @param knex - The Knex instance used to interact with the database.
 * @returns A promise that resolves when the table drop is complete.
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('warehouses');
}
