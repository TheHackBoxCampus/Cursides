import { Transform, Expose} from "class-transformer";

class inscripcion {
    @Expose({name: "id_curso"})
    @Transform(({value}) => {
        if(typeof value != "number" || isNaN(value)) throw {status: 500, message: "Parametros Incorrectos!"}
        return value
    })
    icr: number
    constructor(icr: number) {
        this.icr = icr
    }
}

export default inscripcion;