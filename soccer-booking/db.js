const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'soccer_booking',
  password: 'admin',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

module.exports = pool;
