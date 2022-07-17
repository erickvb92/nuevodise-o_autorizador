export interface CoacreditadoModel {
  id: number | string;
  contrato: string;
  subcontrato: string;
  nombreCompleto: string;
  solicitante?: TipoCoacreditadoModel;
  porcentaje: number;
  calle: string;
  noExt: string;
  noInt: string;
  colonia: string;
  cp: string;
  delegacion: string;
  estado: string;
  fecha: Date;
  rfc: string;
}

export interface CreateCoacreditadoModel extends Omit<CoacreditadoModel, 'id' | 'solicitante'> {
  idSolicitante:  number;
}

export interface CoacreditadoFileModel {
  id: number;
  file: string | ArrayBuffer | null;
  fechaModificacion: Date;
  usuario: string;
}

export interface TipoCoacreditadoModel {
  id: string | number;
  clave: string;
  descripcion: string;
}
