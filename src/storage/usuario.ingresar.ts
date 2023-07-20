import { Transform, Expose } from "class-transformer";

class ingresoUsuario {
  @Expose({ name: "usuario" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 500, message: "Parametros incorrectos!" };
      /**
       * ? Cuando sea string verifica si cumple con las condiciones.
       */
      if (/^[a-zA-Z']+$/.test(value)) return value;
      throw {
        status: 500,
        message: "Parametro incorrecto, verifique la informacion!",
      };
    },
    { toClassOnly: true }
  )
  us: string;
  @Expose({ name: "clave" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 500, message: "Parametros incorrectos!" };
      /**
       * ? Cuando sea string verifica si cumple con las condiciones.
       */
      if (value.length > 16) {
        throw {
          status: 500,
          message: "Parametros pasan los limites de caracteres",
        };
      } else if (value.length < 8) {
        throw {
          status: 500,
          message: "Parametros no cumplen con los requisitos de caracteres",
        };
      } else return value;
    },
    { toClassOnly: true }
  )
  ps: string;

  constructor(us: string, ps: string) {
    this.us = us;
    this.ps = ps;
  }
}

export default ingresoUsuario;
