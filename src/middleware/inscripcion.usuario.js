import "reflect-metadata";
import { validateFieldCharacters } from "./usuario.ingresar.md.js";
import { plainToClass } from "class-transformer";
import inscripcion from "../compiled/inscripcion.usuario.js";

const mdInscripcion = (req, res, next) => {
  let data = req.params;
  let sanitizedUserData = validateFieldCharacters(data);
  sanitizedUserData.id_curso == undefined
    ? res.send({
        status: 500,
        message:
          "Error del servidor, verifique su informacion o vuelva dentro de un instante",
      })
    : (function () {
        try {
          let clearData = {};
          for (let k in sanitizedUserData) {
            clearData[k] = sanitizedUserData[k].split("'").join("");
            clearData[k] = Number(clearData[k]);
          }
          let dto = plainToClass(inscripcion, clearData, {
            excludeExtraneousValues: true,
          });
          req.params = JSON.parse(JSON.stringify(dto));
          next();
        } catch (err) {
          res.send(err);
        }
      })();
};

export default mdInscripcion;
