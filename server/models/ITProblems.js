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

async function getITProblems(query) {
  let client;
  let queryString = '';
  try {
    console.log(typeof query);
    console.log(JSON.stringify(query));
    console.log(Object.keys(query).length);
    if (
      query === undefined ||
      query === null ||
      query === '' ||
      Object.keys(query).length === 0
    ) {
      queryString = '';
    } else {
      queryString = Object.entries(query)
        .map((k) => {
          console.log(k[1]);
          if (k[1] === 'ISNULL') {
            // eslint-disable-next-line prefer-template
            return k[0] + ' IS NULL';
          }
          // eslint-disable-next-line prefer-template
          return k[0] + ` = '` + k[1] + `'`;
        })
        .join(`' AND `);

      queryString = `WHERE ${queryString}`;
    }
    console.log(queryString);

    client = await pool.connect();
    const data = await client.query(
      `SELECT * FROM db1.it_problems ${queryString} ORDER BY created DESC`
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
  getITProblems,
};