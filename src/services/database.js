import mysql from "mysql2";
import dotenv from "dotenv"; 

dotenv.config(); 

let dbcx = mysql.createPool(JSON.parse(process.env.CONNECT))
console.log("se conecto!!");
export default dbcx; 