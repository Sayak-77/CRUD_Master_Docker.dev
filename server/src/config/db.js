import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

// console.log(process.env.CRUD_NAME)
// console.log(process.env.CRUD_HOST)
// console.log(process.env.CRUD_PORT)
const pool = new Pool({
    user: process.env.CRUD_USER,
    host: process.env.CRUD_HOST,
    database: process.env.CRUD_NAME,
    password: process.env.CRUD_PASSWORD,
    port: process.env.CRUD_PORT,
});

pool.on("connect", () => {
    console.log("Connection Pool established with Postgre Database.")
});

export default pool;