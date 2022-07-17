import {
  ClaveClaconesModel,
  SubClaveClaconesModel,
  NombreClaconesModel,
  OrigenClaconesModel,
  DivisaClaconesModel} from './catalogos-caclones.model';

export interface ClaconesModel {
  id: number;
  clave: ClaveClaconesModel | undefined;
  subclave: SubClaveClaconesModel | undefined;
  codigo: string;
  indicadorA: string;
  indicadorB: string;
  nombre: NombreClaconesModel | undefined | null;
  origen: OrigenClaconesModel | undefined;
  complemento: string;
  divisa: DivisaClaconesModel | undefined | null;
  descripcion: string;
  detalle: string;
  activo: boolean;
}


export interface NewClaclonModel extends Omit<ClaconesModel, 'id' | 'clave' | 'subclave' | 'nombre' | 'origen' | 'divisa' | 'activo'> {
  idClave: string;
  idSubclave: string;
  idNombre: string;
  idOrigen: string;
  idDivisa: string
}
