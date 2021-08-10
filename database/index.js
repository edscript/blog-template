const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'blog',
        user: 'root',
        password: 'root',
        server: 'localhost',
    },
})

module.exports = knex
