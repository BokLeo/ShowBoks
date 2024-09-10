import mysql, { Connection, ConnectionOptions } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: ConnectionOptions = {
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
};

const conn = mysql.createConnection(dbConfig);

conn.connect((err: mysql.QueryError | null) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

export default conn;