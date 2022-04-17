import dotenv from "dotenv"
dotenv.config(); //it looks for and reads the .env file
import mysql from 'mysql2/promise'

//creates an object with these key values.
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect(); //tries to connect with the object.

export default connection;

//const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);



