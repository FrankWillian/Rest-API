const pgp = require('pg-promise')();

const db = pgp({
    user: 'postgree',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'blog'
});

module.exports = db;