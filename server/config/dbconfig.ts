import mysql from 'mysql';
import { dbUser, dbPassword } from '../global';

const connection = mysql.createConnection({
  host: 'localhost',
  user: dbUser,
  password: dbPassword,
  database: 'qlsample',
});

connection.connect();

export {
  connection,
}