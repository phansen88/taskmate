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

async function getDictionary() {
  let client;
  try {
    client = await pool.connect();
    const data = await client.query(
      `select table_schema,
      table_name,
      ordinal_position as position,
      column_name,
      data_type,
      case when character_maximum_length is not null
           then character_maximum_length
           else numeric_precision end as max_length,
      is_nullable,
      column_default as default_value
from information_schema.columns
where table_schema not in ('information_schema', 'pg_catalog')
order by table_schema, 
        table_name,
        ordinal_position;`
    );
    return data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  getDictionary,
};