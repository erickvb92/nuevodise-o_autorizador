export interface LogotipoModel {
  id: number;
  idEmpresa: string | number;
  img: string | ArrayBuffer | null;
  fechaModificacion: Date;
  institucion: string;
  usuario: string;
}
