var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform, Expose } from "class-transformer";
class ingresoUsuario {
    constructor(us, ps) {
        this.us = us;
        this.ps = ps;
    }
}
__decorate([
    Expose({ name: "usuario" }),
    Transform(({ value }) => {
        if (typeof value != "string")
            throw { status: 500, message: "Parametros incorrectos!" };
        /**
         * ? Cuando sea string verifica si cumple con las condiciones.
         */
        if (/^[a-zA-Z']+$/.test(value))
            return value;
        throw {
            status: 500,
            message: "Parametro incorrecto, verifique la informacion!",
        };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], ingresoUsuario.prototype, "us", void 0);
__decorate([
    Expose({ name: "clave" }),
    Transform(({ value }) => {
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
        }
        else if (value.length < 8) {
            throw {
                status: 500,
                message: "Parametros no cumplen con los requisitos de caracteres",
            };
        }
        else
            return value;
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], ingresoUsuario.prototype, "ps", void 0);
export default ingresoUsuario;
