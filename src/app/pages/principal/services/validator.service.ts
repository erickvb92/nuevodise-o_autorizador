import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { validaArchivo } from 'src/app/model/reglas-valida-archivo';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService implements AsyncValidator {

  constructor(private _http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    control.markAsTouched()
    const file        : File = control.value;
    const filename    : string[] = file.name.split(".");

    if(file.size === 0){
      return of({
        archivoVacio:true
      })
    }

    // return this._http.get<validaArchivo>('/reglasCarga/1')
      return this.getReglasDUMMY()
      .pipe(
        map( reglas => {
          const extensionCorrecto = reglas[0].extension.find((ext:string) => ext === filename[1].toLowerCase())
          const sizeCorrecto = reglas[0].size.find((size:number) => size > Math.round(file.size/1024/1024))
          const nombreCorrecto = reglas[0].archivos.find((archivo:string) => filename[0].includes(archivo) && this.validaFormatoFecha(filename[0].substring(archivo.length), reglas[0].formatoFecha))

          if(!extensionCorrecto) {
            console.warn("Valida Extension")
            return { archivoExtension :true }
          } else if(!sizeCorrecto) {
            console.warn("Valida tamaño")
            return { archivoSize :true }
          } else if(!nombreCorrecto) {
            console.warn("Valida Nombre")
            return { archivoNombre :true }
          } else return null
        })
      )
  }

  validaFormatoFecha(cadenaNombreFecha:string , formatoFecha:string): Boolean {
    try {
      const date = moment(cadenaNombreFecha, formatoFecha);
      return date.isValid();
    } catch (error) {
      console.error("Error Formato fecha", error)
    }
    return false;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ DUMMY
  // -----------------------------------------------------------------------------------------------------

  /**
   * servicio DUMMY para obtener reglas de validacion para el archivo
   */
  getReglasDUMMY(): Observable<validaArchivo[]>{
    const reglas : validaArchivo[] = [
      {
        id: 1,
        archivos: [
          "CargaAutoTerreD",
          // "CargaIntBancoBursD",
          "CargaArrendaD"
        ],
        extension: [
          "txt"
        ],
        size : [ 1.5 ],
        formatoFecha: "YYYYMMDD"
      },
      {
        id: 2,
        archivos: [
        ],
        extension: [
          "png"
        ],
        size : [ 1.5 ],
        formatoFecha: "YYYYMMDD"
      },
      {
        id: 3,
        archivos: [
        ],
        extension: [
          "xls",
          "xlsx"
        ],
        size : [ 1.5 ],
        formatoFecha: "YYYYMMDD"
      }
    ];
    return of(reglas)
  }
}
