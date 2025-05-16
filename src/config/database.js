import mysql from 'mysql2/promise';
import Bluebird from 'bluebird';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: Bluebird,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;