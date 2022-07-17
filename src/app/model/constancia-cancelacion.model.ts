import { Constancia } from './constancia.model';
import { SelloCancelacion } from './sello-cancelacion.model';
export class ConstanciaCancelacion extends Constancia {
    idMotivo: string;
    comentario: string;
    sellosCancelar: SelloCancelacion[];
}
