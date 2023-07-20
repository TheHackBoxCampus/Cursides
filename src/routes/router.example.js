import { Router } from "express";
import dbcx from "../services/database.js";

let router = Router(); 

router.get("/", (req, res) => {
    dbcx.query("SELECT * FROM Usuario", (err, results) => err ? res.send(err) : res.send(results))
});


export default router;

