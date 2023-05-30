/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-comment-textnodes */
// Ensure environment variables are read.
require('dotenv').config();
//const { json } = require('body-parser');
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

async function getUIModules() {
  let client;
  try {
    client = await pool.connect();
    const data = await client.query(
      'SELECT * FROM db1.ui_modules ORDER BY ui_modules.parent DESC, ui_modules.order ASC'
    );
    // eslint-disable-next-line prefer-const
    let records = [];
    let record;
    let i = 0;

    while (data.rows[i]) {
      record = data.rows[i];

      if (record.parent == null) {
        records.push(record);
      } else {
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < records.length; x++) {
          if (records[x].uid === record.parent) {
            if (records[x].children === undefined) {
              records[x].children = [record];
            } else {
              records[x].children.push(record);
            }
          }
        }
      }
      // eslint-disable-next-line no-plusplus
      i++;
    }
    return records;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  getUIModules,
};