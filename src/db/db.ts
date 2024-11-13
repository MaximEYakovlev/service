import knex from 'knex';
import config from '../../knexfile';
import 'dotenv/config';

export const db = knex(config[`${process.env.ENVIRONMENT}`]);
