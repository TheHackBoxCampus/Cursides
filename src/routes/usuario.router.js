import { Router } from "express";
import dotenv from "dotenv";
import argon2 from "argon2";
import mdIngresarUsuario from "../middleware/usuario.ingresar.md.js";
import validateJWTIngreso from "../middleware/usuario.jwtingresar.js";
import dbcx from "../services/database.js";
import { SignJWT } from "jose";

let router = Router();
dotenv.config();

router.post(
  "/ingresar/:usuario/:clave",
  mdIngresarUsuario,
  async (req, res) => {
    let data = req.params;
    let searchUser = /* sql */ `SELECT u.id_usuario as i, u.contraseña_usuario as p FROM Usuario AS u WHERE u.nombre_usuario = ?`;
    dbcx.query(searchUser, [data.us], async (err, results) => {
      if (err) {
        res.send(err);
      } else {
        if (results.length >= 1) {
          let compare = await argon2.verify(
            String(results[0].p),
            String(data.ps)
          );
          if (compare) {
            let encoder = new TextEncoder();
            let jwtConstruct = new SignJWT({ id: results[0].i});
            let jwt = await jwtConstruct
              .setProtectedHeader({ alg: "HS256", typ: "JWT" })
              .setIssuedAt()
              .setExpirationTime("30s")
              .sign(encoder.encode(process.env.KEY));
            res.cookie(`auth`, jwt);
            res.send({
              status: 200,
              message:
                "Autenticacion exitosa!, la sesion estara activa durante algunos minutos.",
            });
          } else {
            res.send({ status: 401, message: "Contraseña incorrecta!" });
          }
        } else {
          res
            .status(401)
            .send({ status: 401, message: "El usuario no existe!" });
        }
      }
    });
  }
);

router.get("/informacion_cursos", validateJWTIngreso, async (req, res) => {
    res.send(req.user); 
});

export default router;

// let insert = "insert into usuario (nombre_usuario, email_usuario, contraseña_usuario) VALUES (?,?,?)"
// let hased = await bcrypt.hash(data.ps, 10);
// dbcx.query(insert, [data.us, "kalednarino@gmail.com", hased], (err) => res.send("se inserto"));
