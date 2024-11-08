const pg = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'user',
        password: 'password',
        database: 'wb',
    },
});

const run = async () => {
    const data = await pg.select().from('zoo');
    console.log('data >', data);
};

run();
