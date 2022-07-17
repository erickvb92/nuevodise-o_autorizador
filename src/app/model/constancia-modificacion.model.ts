import { Constancia } from './constancia.model';
import { ConstanciaInformacion } from './constancia-informacion.model';
export class ConstanciaModificacion extends Constancia {
    isSello?              : boolean;
    ConstanciaInformacion?   : ConstanciaInformacion;
    comentario ?       : string;
}
