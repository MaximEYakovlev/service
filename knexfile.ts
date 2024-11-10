import type { Knex } from 'knex';
import 'dotenv/config';

/**
 * Database configuration settings for different environments.
 *
 * This configuration object includes settings for:
 * - **development**: Specifies database connection details for the development environment.
 *
 * The connection details (host, user, password, database) are loaded from environment variables,
 * which should be defined in a `.env` file or the environment where this application is deployed.
 *
 * @typeParam {Knex.Config} - Type used to define Knex configuration options for TypeScript type safety.
 */
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './src/db/migrations',
    },
  },
};

export default config;
