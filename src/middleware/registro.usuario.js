import "reflect-metadata";
import {
  validateFieldCharacters,
  validateConsultsPosibles,
} from "./usuario.ingresar.md.js";
import registro from "../controller/registro.usuario.js"
import { plainToClass } from "class-transformer";

const mdRegistroUsuario = (req, res, next) => {
    let data = req.params; 
    let sanitizedUserData = validateFieldCharacters(data);
    let verifySecurity = validateConsultsPosibles(sanitizedUserData, "usuario", "nueva_clave");
    verifySecurity.usuario == undefined
    ? res.send(verifySecurity)
    : (function () {
        try {
          let dto = plainToClass(registro, verifySecurity, {
            excludeExtraneousValues: true,
          });
          req.params = JSON.parse(JSON.stringify(dto));
          next();
        } catch (err) {
          res.send(err);
        }
      })();
};

export default mdRegistroUsuario;
