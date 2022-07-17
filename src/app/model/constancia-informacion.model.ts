
import { AbstractControl,FormArray,FormGroup } from '@angular/forms';
import { Constancia } from "./constancia.model";
import { EjercicioFiscal } from "./ejercicio-fiscal.model";
import { Institucion } from "./institucion.model";
import { TipoConstancia } from './tipo-constancia.model';

export interface ConstanciaInformacion /* extends Constancia  */{
    general             : General,
    datosEmisor        : DatosEmisor,
    datosReceptor      : DatosReceptor,
    datosOperacion     : DatosOperacion,
}

export interface General {
    ejercicio           : string, //EjercicioFiscal,
    periodo            : string | null,
    tipoConstancia     : string, //TipoConstancia, /* Constancia.tipo */
    folioInterno       : string | null,
    claveRetencion     : string | null,
    descRetencion      : string | null,
    aField             : string | null    
}
export interface DatosEmisor {
    institucion         : string, //Institucion,
    rfc                : string,
    calle              : string,
    noExt              : string,
    noInt              : string,
    cp                 : string,
    colonia            : string,
    delegacionMunicipio: string,
    estado             : string,
    pais               : string,
    regimenFiscal      : string,
    lugarExpedicion    : string
}

export interface DatosReceptor {
    nombreRazonSocial  : string,
    rfc                : string,
    numProv            : string,
    curp               : string,
    nacionalidad       : string,
    cp                 : string,
    colonia            : string,
    calle              : string,
    noExt              : string,
    noInt              : string,
    delegacionMunicipio: string,
    estado             : string,
    pais               : string,
    paisResidencia     : string,
    esBenefEfect       : string,
    conceptoPago       : string,
    descripcionConcepto: string
}
export interface DatosOperacion {
    baseRetencionIsr   : string,
    impuestoRetenidoIsr: string,
    tipoRetencionIsr   : string,
    baseRetencionIva   : string,
    impuestoRetenidoIva: string,
    tipoRetencionIva   : string,
    montoTotalOperacion: string,
    montoTotalGravado  : string,
    montoTotalExento   : string,
    montoTotalRetenido : string
}

// export type ConstanciaInformacionControls = {[key in keyof ConstanciaInformacion]: AbstractControl}
 export type GeneralControls                    = {[key in keyof General]: AbstractControl}
 export type DatosEmisorControls                = {[key in keyof DatosEmisor]: AbstractControl}
 export type DatosReceptorControls              = {[key in keyof DatosReceptor]: AbstractControl}
 export type DatosOperacionControls             = {[key in keyof DatosOperacion]: AbstractControl}

export type ConstanciaInformacioncControlGroups = 
{  
    general: GeneralControls,
    datosEmisor: DatosEmisorControls,
    datosReceptor: DatosReceptorControls,
    datosOperacion: DatosOperacionControls
}

export type ConstanciaInformacionControls       = {[key in keyof ConstanciaInformacioncControlGroups]: FormGroup}
export type ConstanciaInformacionFormGroup      = FormGroup & { value: ConstanciaInformacion, controls: ConstanciaInformacionControls }




/**
 * Form.controls autocomplete with value types.
 */
 export type FormControls<T> = {
    [key in keyof T]: T[key] extends TForm<any> | FormArray // If control value has type of TForm (nested form) or FormArray
      ? T[key] // Use type that we define in our FormModel
      : Omit<AbstractControl, 'value'> & { value: T[key] } // Or use custom AbstractControl with typed value
  };
  
  export type TForm<T> = FormGroup & {
    controls: FormControls<T>;
  };
  