import type { Knex } from 'knex';

/**
 * Creates the `periods` table in the database.
 *
 * This migration defines the structure for the `periods` table, including:
 * - `id`: Primary key, auto-incremented.
 * - `dtNextBox`: Date field that cannot be null.
 * - `dtTillMax`: Date field that cannot be null.
 *
 * This table is used to store information about periods with start and end dates.
 *
 * @param knex - The Knex instance used to interact with the database.
 * @returns A promise that resolves when the migration is complete.
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('periods', (table) => {
    table.increments('id').primary();
    table.date('dtNextBox').notNullable();
    table.date('dtTillMax').notNullable();
  });
}

/**
 * Drops the `periods` table from the database if it exists.
 *
 * This migration is responsible for removing the `periods` table from the database.
 * It is typically used for rolling back the migration when no longer needed.
 *
 * @param knex - The Knex instance used to interact with the database.
 * @returns A promise that resolves when the table is dropped, if it exists.
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('periods');
}
