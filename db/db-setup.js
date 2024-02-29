require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, 
  idleTimeoutMillis: 10000, 
  connectionTimeoutMillis: 5000, 
});

module.exports = pool;
