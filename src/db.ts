import { createConnection } from 'mysql';
require('dotenv').config()

export const db = createConnection({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    }
);