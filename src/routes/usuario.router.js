import { Router } from "express";
import dotenv from "dotenv";
import argon2 from "argon2";
import { mdIngresarUsuario } from "../middleware/usuario.ingresar.md.js";
import validateJWTIngreso from "../middleware/usuario.jwtingresar.js";
import mdInscripcion from "../middleware/inscripcion.usuario.js";
import dbcx from "../services/database.js";
import { SignJWT } from "jose";
/**
 @var dotenv -> sirve las variables de entorno
 */

let router = Router();
dotenv.config();

/**
 @param /ingresar/:usuario/:clave
 * * Endpoint donde el usuario pueda ingresar a su cuenta y crear una sesión.
*/
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
            let jwtConstruct = new SignJWT({ id: results[0].i });
            let jwt = await jwtConstruct
              .setProtectedHeader({ alg: "HS256", typ: "JWT" })
              .setIssuedAt()
              .setExpirationTime("10m")
              .sign(encoder.encode(process.env.KEY));
            res.cookie(`auth`, jwt, {
              httpOnly: true, // ! cookie solo de lectura, para el cliente
            });
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

/**
 @param /informacion_cursos
 * * Endpoint donde el usuario consulte la informacion de los cursos donde se ha inscrito
*/

router.get("/informacion_cursos", validateJWTIngreso, async (req, res) => {
  if (req.user) {
    let searchCurses = /* sql */ `
          SELECT u.nombre_usuario as Nombre,
	               c.nombre_curso as Curso
          FROM Usuario AS u
          JOIN inscripcion as i ON i.id_usuario = ?
          JOIN curso AS c ON c.id_curso = i.id_curso
       `;
    dbcx.query(
      searchCurses,
      [req.user.payload.id],
       (err, results) =>
      err ? res.send(err) : res.send({user: req.user.payload.id, in:results})
    );
  }
});

/**
 @param /inscripcion/:id_curso
 * * Endpoint donde el usuario se inscribe a un curso.
*/

router.post(
  "/inscripcion/:id_curso",
  mdInscripcion,
  validateJWTIngreso,
  async (req, res) => {
    if (req.user) {
      let data = req.params;
      let createdInscriptionForCurse = /* sql */ `
            INSERT INTO inscripcion (id_usuario, id_curso) 
            VALUES (?, ?)`;

      let pattern = /* sql */ `SELECT id_usuario as iu, id_curso as ic FROM inscripcion`;
      dbcx.query(pattern, (err, results) => {
        if (err) res.send(err);
        else {
          let exist = false;
          for (let px = 0; px < results.length; px++) {
            if (
              results[px].iu == req.user.payload.id &&
              results[px].ic == data.icr
            ) {
              exist = true;
            }
            if (exist) {
              res
                .status(500)
                .send({
                  status: 500,
                  message: "El usuario ya esta registrado en ese curso",
                });
            } else {
              dbcx.query(
                createdInscriptionForCurse,
                [req.user.payload.id, data.icr],
                (err) => {
                  err
                    ? res.send(err)
                    : res.status(200).send({
                        status: 200,
                        message:
                          "El usuario se ha escrito correctamente al curso, puede ver sus cursos en la seccion de informacion_cursos",
                      });
                }
              );
            }
          }
        }
      });
    }
  }
);

export default router;
