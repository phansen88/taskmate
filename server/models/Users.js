// Ensure environment variables are read.
require('dotenv').config();
// const { json } = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PDB_HOST,
  port: process.env.PDB_PORT,
  user: process.env.PDB_USERNAME,
  password: process.env.PDB_PASSWORD,
  database: process.env.PDB_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function getUsers() {
  let client;
  try {
    client = await pool.connect();
    const res = await client.query('SELECT * FROM db1.users ORDER BY uid ASC');
    return res.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}

async function createUser(data) {
  let client;
  try {
    client = await pool.connect();
    const res = await client.query(
      'INSERT INTO db1.users (first_name, last_name, active, title, role, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      ['John', 'Wayne', '0', 'Developer', 'Fastests Man', 'john@example.com']
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  getUsers,
  createUser,
};