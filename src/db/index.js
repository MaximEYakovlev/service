const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'user',
        password: 'password',
        database: 'wb',
    },
});

const createTable = async () => {
    try {
        await knex.raw(`
            CREATE TABLE IF NOT EXISTS periods(
                id SERIAL PRIMARY KEY,
                dtNextBox DATE,
                dtTillMax DATE
            );
        `);

        await knex.raw(`
            CREATE TABLE IF NOT EXISTS warehouses (
                id SERIAL PRIMARY KEY,
                warehouseName VARCHAR(100) UNIQUE
            );
        `);

        await knex.raw(`
            CREATE TABLE IF NOT EXISTS tariffs (
                id SERIAL PRIMARY KEY,
                period_id INT NOT NULL REFERENCES periods(id) ON DELETE CASCADE,
                warehouse_id INT NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
                boxDeliveryAndStorageExpr DECIMAL,
                boxDeliveryBase DECIMAL,
                boxDeliveryLiter DECIMAL,
                boxStorageBase DECIMAL,
                boxStorageLiter DECIMAL
            );
        `);
    } catch (error) {
        console.error(error);
    } finally {
        await knex.destroy();
    }
};

createTable();
