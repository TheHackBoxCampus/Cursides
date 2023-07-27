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
class inscripcion {
    constructor(icr) {
        this.icr = icr;
    }
}
__decorate([
    Expose({ name: "id_curso" }),
    Transform(({ value }) => {
        if (typeof value != "number" || isNaN(value))
            throw { status: 500, message: "Parametros Incorrectos!" };
        return value;
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], inscripcion.prototype, "icr", void 0);
export default inscripcion;
