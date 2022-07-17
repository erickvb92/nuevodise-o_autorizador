export class Estatus {

    static DISPONIBLE = new Estatus(1, "DISPONIBLE");
    static CANCELADO = new Estatus(2, "CANCELADO");
    static FLUJO_ACLARACION = new Estatus(3, "FLUJO ACLARACION");
    static BLOQUEADO = new Estatus(4, "BLOQUEADO");

    readonly idEstatus: number;
    readonly descEstatus: string;

    constructor(idEstatus: number, descEstatus: string) {
        this.idEstatus = idEstatus;
        this.descEstatus = descEstatus;
    }
}
