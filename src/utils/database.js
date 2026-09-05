import mysql from 'mysql2';
import 'dotenv/config';

// A pool reuses database connections instead of opening a new one
// for every request. The promise API allows models to use async/await.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

export default promisePool;
