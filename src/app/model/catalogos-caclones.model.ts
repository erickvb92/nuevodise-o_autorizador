export interface ClaveClaconesModel {
  id: number | string;
  nombreClave: string;
  descripcion?: string;
}

export interface SubClaveClaconesModel extends Omit<ClaveClaconesModel, 'nombreClave'> {
  nombreSub: string;
}

export interface NombreClaconesModel extends Omit<ClaveClaconesModel, 'nombreClave'> {
  nombre: string;
}

export interface OrigenClaconesModel extends Omit<ClaveClaconesModel, 'nombreClave'> {
  nombreOrigen: string;
}

export interface DivisaClaconesModel extends Omit<ClaveClaconesModel, 'nombreClave'> {
  nombreDivisa: string;
}
