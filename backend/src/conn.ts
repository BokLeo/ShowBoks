import mysql, { Connection, ConnectionOptions } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: ConnectionOptions = {
  host: process.env.DB_HOST_RELEASE as string,
  user: process.env.DB_USER_RELEASE as string,
  password: process.env.DB_PASS_RELEASE as string,
  database: process.env.DB_NAME_RELEASE as string,
  port: process.env.DB_PORT_RELEASE ? parseInt(process.env.DB_PORT_RELEASE) : undefined,
};

const conn = mysql.createConnection(dbConfig);


conn.connect((err: mysql.QueryError | null) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Ping the database to check the connection
// conn.ping((err: mysql.QueryError | null) => {
//   if (err) {
//     console.error('Ping error:', err);
//   } else {
//     console.log('Ping successful');
//   }
// });

export default conn;