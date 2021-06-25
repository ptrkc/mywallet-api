import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};
const db = new pg.Pool(dbConfig);

export default db;
