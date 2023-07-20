import "reflect-metadata";
import { plainToClass } from "class-transformer";
import ingresoUsuario from "../compiled/usuario.ingresar.js";
import dbcx from "../services/database.js";

function validateFieldCharacters(obj) {
  let sanitizedData = Object.assign({}, obj);

  for (let key in sanitizedData) {
    if (sanitizedData.hasOwnProperty(key)) {
      sanitizedData[key] = dbcx.escape(sanitizedData[key]);
    }
  }
  return sanitizedData;
}

function validateConsultsPosibles(obj) {
  let options = ["DELETE", "SELECT", "INSERT", "UPDATE"];
  let denied = false;

  for (let x = 0; x < options.length; x++) {
    if (
      obj.usuario.toLowerCase().includes(options[x].toLowerCase()) ||
      obj.clave.toLowerCase().includes(options[x].toLowerCase())
    ) {
      denied = true;
    }
  }

  if (denied)
    return {
      status: 500,
      message:
        "Error del servidor, verifique su informacion o vuelva dentro de un instante",
    };
  else {
    let clearData = {};
    for(let k in obj) {
      clearData[k] = obj[k].split("'").join("")
    }
    return clearData;
  }
}

const mdIngresarUsuario = (req, res, next) => {
  let data = req.params;
  let sanitizedUserData = validateFieldCharacters(data);
  let verifySecurity = validateConsultsPosibles(sanitizedUserData);
  verifySecurity.usuario == undefined
    ? res.send(verifySecurity)
    : (function () {
        try {
          let dto = plainToClass(ingresoUsuario, verifySecurity, {
            excludeExtraneousValues: true,
          });
          req.params = JSON.parse(JSON.stringify(dto));
          next();
        } catch (err) {
          res.send(err);
        }
      })();
};

export default mdIngresarUsuario;
