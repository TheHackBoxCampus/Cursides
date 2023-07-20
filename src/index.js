import express from "express";
import dotenv from "dotenv"; 
import app from "./app.js";
import router from "./routes/usuario.router.js";
import cookieParser from "cookie-parser"; 

/**
 @var dotenv -> sirve las variables de entorno
 */

dotenv.config(); 

/**
 @var $server -> Guarda la variable SERVER en $server del enviroment
 * 
 */
let $server = JSON.parse(process.env.SERVER);

/**
 * * middleware
 @param express.json() // * Permisos de contenido JSON 
 */
app.use(express.json()); 
app.use(express.text())
app.use(cookieParser());

app.use("/api_cursides", router);

app.listen($server, () => {
    console.log(`listening http://${$server.hostname}:${$server.port}`); 
}); 
