import { Router } from "express";
import { customAlphabet } from "nanoid";
import dotenv from "dotenv";
import argon2 from "argon2";
import { mdIngresarUsuario } from "../middleware/usuario.ingresar.md.js";
import validateJWTIngreso from "../middleware/usuario.jwtingresar.js";
import mdInscripcion from "../middleware/inscripcion.usuario.js";
import mdRegistroUsuario from "../middleware/registro.usuario.js";
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
            if (req.cookies.auth) {
              res.status(401).send({
                status: 401,
                message: "El usuario ya esta autorizado!.",
              });
            } else {
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
            }
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
 @param /registro/:usuario/:nueva_clave/:correo
 * * Endpoint para el registro de usuarios
 */

router.post(
  "/registro/:usuario/:nueva_clave/:correo",
  mdRegistroUsuario,
  (req, res) => {
    let data = req.params;
    let searchUser = /* sql */ `SELECT u.nombre_usuario AS n FROM Usuario AS u`;
    dbcx.query(searchUser, async (err, results) => {
      if (err) res.send(err);
      else {
        let existUser = false;
        for (let p = 0; p < results.length; p++) {
          if (data.usr == results[p].n) existUser = true;
        }
        if (existUser)
          res
            .status(500)
            .send({ status: 500, message: "El nombre ya esta en uso." });
        else {
          let generateIndexRandom = customAlphabet("0123456789", 5);
          let indexRandom = generateIndexRandom();
          let pswhashed = await argon2.hash(data.cl);
          let createUser = /* sql */ `INSERT INTO Usuario (id_usuario, nombre_usuario, email_usuario, contraseña_usuario) VALUES (?,?,?,?)`;
          dbcx.query(
            createUser,
            [indexRandom, data.usr, data.em, pswhashed],
            async (err) => {
              if (err) res.send(err);
              else {
                let encoder = new TextEncoder();
                let jwtConstruct = new SignJWT({ id: indexRandom });
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
                    "El registro fue exitoso, Ahora puede utilizar las otras secciones.",
                });
              }
            }
          );
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
          JOIN inscripcion as i ON i.id_usuario = u.id_usuario
          JOIN curso AS c ON c.id_curso = i.id_curso
          WHERE u.id_usuario = ?
       `;
    dbcx.query(searchCurses, [req.user.payload.id], (err, results) =>
      err ? res.send(err) : res.send({ user: req.user.payload.id, in: results })
    );
  }
});

/**
 @param /inscripcion/:id_curso
 * * Inscripciones para cada curso
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
          }
          if (exist) {
            res.status(500).send({
              status: 500,
              message: "El usuario ya esta registrado en ese curso",
            });
          } else {
            dbcx.query(
              createdInscriptionForCurse,
              [req.user.payload.id, data.icr],
              (err) => {
                if (err) res.send(err);
                else {
                  /**
                   * * Progreso inicial
                   */

                  let lastIdInscription = /* sql */ `
                      SELECT i.id_inscripcion as isc
                      FROM inscripcion as i 
                      ORDER BY isc DESC
                      LIMIT 1;
                    `;
                  dbcx.query(lastIdInscription, (err, results) => {
                    if (err) res.send(err);
                    else {
                      let insertProgress = /* sql */ `
                          INSERT INTO progreso (puntuacion, id_inscripcion, id_leccion) 
                          VALUES (?, ?, ?);
                          `;
                      dbcx.query(
                        insertProgress,
                        [0, results[0].isc, 1],
                        (err) => {
                          if (err) res.send(err);
                          else {
                            res.status(200).send({
                              status: 200,
                              message:
                                "El usuario se ha escrito correctamente al curso, puede ver sus cursos en la seccion de informacion_cursos",
                            });
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        }
      });
    }
  }
);

/**
 @param /lecciones_capitulo
 * * Mostrar los capítulos de un curso y el número de lecciones en cada capítulo
*/

router.get("/lecciones_capitulo", validateJWTIngreso, (req, res) => {
  if (req.user) {
    let searchChaptersAndLessons = /* sql */ `
        SELECT cr.nombre_curso as curso,
               c.nombre_capitulo AS capitulo,
               COUNT(l.id_capitulo) AS lecciones_cantidad
        FROM capitulo AS c
        LEFT JOIN leccion as l ON c.id_capitulo = l.id_capitulo
        LEFT JOIN curso as cr ON cr.id_curso = l.id_curso
        GROUP BY capitulo
        `;

    dbcx.query(searchChaptersAndLessons, (err, results) => {
      if (err) res.send(err);
      else {
        res.status(200).send(results);
      }
    });
  }
});

/**
 @param /usuarios_inscritos
 * * Mostrar la cantidad de usuarios inscritos en cada categoría de cursos.
*/

router.get("/usuarios_inscritos", validateJWTIngreso, (req, res) => {
  if (req.user) {
    let usersInCurse = /* sql */ `
     SELECT c.nombre_categoria as categoria,
	          COUNT(u.id_usuario) as Cantidad		
     FROM inscripcion as i
     LEFT JOIN curso as crs ON i.id_curso = crs.id_curso
     LEFT JOIN categoria as c ON c.id_categoria = crs.id_categoria
     RIGHT JOIN usuario as u ON u.id_usuario = i.id_usuario 
     GROUP BY categoria 
     `;

    dbcx.query(usersInCurse, (err, results) => {
      if (err) res.send(err);
      else {
        res.status(200).send(results);
      }
    });
  }
});

/**
 @param /docentes
 * * Listar los docentes y su cantidad de especializaciones.
*/

router.get("/docentes", validateJWTIngreso, (req, res) => {
  if (req.user) {
    let searchTeacher = /* sql */ `
       SELECT d.nombre_docente as Docente,
              e.nombre_especializacion as Especializacion 
       FROM docente as d
       LEFT JOIN especializacion as e ON d.id_especializacion = e.id_especializacion
       `;

    dbcx.query(searchTeacher, (err, results) => {
      if (err) res.send(err);
      else {
        res.status(200).send(results);
      }
    });
  }
});

export default router;
