import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import errorHandling from "./middlewares/errorHandling.js";
import router from "./routes/userRoutes.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use(cors());

//Testing db_connection
app.get("/", async(req, res) => {
    console.log("Start");
    const result = await pool.query("SELECT current_database() AS db_name");
    res.send(`The Database name is: ${result.rows[0].db_name}`)
})
//routes
app.use("/api", router)

//error handling middleware
app.use(errorHandling);

//create Table before Starting Server
createUserTable();

//server port
app.listen(port, () =>{
    console.log(`Server is running on http:localhost:${port}`);
})