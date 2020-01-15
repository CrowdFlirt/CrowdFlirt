const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'sayertindall',
    database: 'flirt',
    password: '1111',
});

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Connected to PostgreSQL')
    }
});

module.exports = { client };
