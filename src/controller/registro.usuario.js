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
class registro {
    constructor(usr, cl, em) {
        this.usr = usr;
        this.cl = cl;
        this.em = em;
    }
}
__decorate([
    Expose({ name: "usuario" }),
    Transform(({ value }) => {
        if (typeof value != "string")
            throw { status: 500, message: "Parametros incorrectos!" };
        if (value.length < 8)
            throw {
                status: 500,
                message: "Algun parametro no cumple con los estandares",
            };
        if (/^[a-z A-Z]+$/.test(value))
            return value;
        else {
            throw {
                status: 500,
                message: "Algun parametro no cumple con los requisitos.",
            };
        }
        return value;
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], registro.prototype, "usr", void 0);
__decorate([
    Expose({ name: "nueva_clave" }),
    Transform(({ value }) => {
        if (typeof value != "string")
            throw { status: 500, message: "Parametros incorrectos!" };
        if (value.length < 8)
            throw {
                status: 500,
                message: "Algun parametro no cumple con los estandares",
            };
        if (/^[a-z A-Z 0-9]+$/.test(value))
            return value;
        else {
            throw {
                status: 500,
                message: "Algun parametro no cumple con los requisitos.",
            };
        }
        return value;
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], registro.prototype, "cl", void 0);
__decorate([
    Expose({ name: "correo" }),
    Transform(({ value }) => {
        if (typeof value != "string")
            throw { status: 500, message: "Parametros incorrectos!" };
        if (/\S+@\S+\.\S+/.test(value))
            return value;
        else {
            throw {
                status: 500,
                message: "Algun parametro no cumple con los requisitos.",
            };
        }
        return value;
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], registro.prototype, "em", void 0);
export default registro;
