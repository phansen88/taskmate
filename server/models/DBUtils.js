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

async function getSessions() {
  let client;
  try {
    client = await pool.connect();
    const data = await client.query(
      `SELECT query_start, state
      FROM pg_stat_activity
      WHERE state IS NOT NULL AND usename = 'dbadmin'`
    );
    return data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}

async function getSlowSQLQueries() {
  let client;
  try {
    client = await pool.connect();
    const data = await client.query(
      `SELECT query, calls, total_time, rows
      FROM db1.pg_stat_statements
      WHERE total_time > extract(epoch from interval '5 seconds')
      AND query LIKE 'SELECT%'
      AND query LIKE '%db1.%'
      ORDER BY total_time DESC`
    );
    return data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}

async function getSlowActiveQueries() {
  let client;
  try {
    client = await pool.connect();
    const data = await client.query(
      `SELECT
      pid,
      now() - pg_stat_activity.query_start AS duration,
      query,
      state
    FROM pg_stat_activity
    WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes'`
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
  getSessions,
  getSlowSQLQueries
};