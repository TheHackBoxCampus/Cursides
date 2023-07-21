import { Transform, Expose } from "class-transformer";

class registro {
  @Expose({ name: "usuario" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 500, message: "Parametros incorrectos!" };
      if (value.length < 8)
        throw {
          status: 500,
          message: "Algun parametro no cumple con los estandares",
        };
      if (/^[a-z A-Z]+$/.test(value)) return value;
      else {
        throw {
          status: 500,
          message: "Algun parametro no cumple con los requisitos.",
        };
      }
      return value;
    },
    { toClassOnly: true }
  )
  usr: string;

  @Expose({ name: "nueva_clave" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 500, message: "Parametros incorrectos!" };
      if (value.length < 8)
        throw {
          status: 500,
          message: "Algun parametro no cumple con los estandares",
        };
      if (/^[a-z A-Z 0-9]+$/.test(value)) return value;
      else {
        throw {
          status: 500,
          message: "Algun parametro no cumple con los requisitos.",
        };
      }
      return value;
    },
    { toClassOnly: true }
  )
  cl: string;

  @Expose({ name: "correo" })
  @Transform(
    ({ value }) => {
      if (typeof value != "string")
        throw { status: 500, message: "Parametros incorrectos!" };

      if (/\S+@\S+\.\S+/.test(value)) return value;
      else {
        throw {
          status: 500,
          message: "Algun parametro no cumple con los requisitos.",
        };
      }
      return value;
    },
    { toClassOnly: true }
  )
  em: string;

  constructor(usr: string, cl: string, em: string) {
    this.usr = usr;
    this.cl = cl;
    this.em = em;
  }
}

export default registro;
