import { AbstractControl } from '@angular/forms';
import { ValidatorService } from '../pages/principal/services/validator.service';
import { delay, map } from 'rxjs/operators'
import { of } from 'rxjs';
import * as moment from 'moment';
import { TypeFilesEnum } from '../enum/type-files';
import { CoacreditadosService } from '../pages/administracion/services/coacreditados.service';

export class MyValidations {
  static noContrato: string = '';

  static fileValidations(validatorService: ValidatorService, type: number) {
    return (control: AbstractControl) => {
      control.markAsTouched()
      const file: File = control.value;
      const filename: string[] = file.name.split(".");

      if(file.size === 0){
        return of({
          archivoVacio: true
        })
      }

      return validatorService.getReglasDUMMY()
      .pipe(
        map( response => {
          const rules = response.find(rule => rule.id === type);
          const extensionCorrecto = rules?.extension.find((ext:string) => ext === filename[1].toLowerCase());
          const sizeCorrecto = rules?.size.find((size:number) => size > Math.round(file.size/1024/1024))
          const nombreCorrecto = rules?.archivos.find((archivo:string) => filename[0].includes(archivo) && this.validaFormatoFecha(filename[0].substring(archivo.length), rules.formatoFecha))

          if(!extensionCorrecto){
            console.warn("Valida Extension")
            return { archivoExtension : true }
          } else if(!sizeCorrecto){
            console.warn("Valida tamaño")
            return { archivoSize : true }
          } else if(!nombreCorrecto && (type !== TypeFilesEnum.LOGOTIPO && type !== TypeFilesEnum.COACREDITADOS)) {
            console.warn("Valida Nombre")
            return { archivoNombre : true }
          }
          return null;
        })
      );
    }
  }


  static validaFormatoFecha(cadenaNombreFecha:string , formatoFecha:string): Boolean {
    try {
      const date = moment(cadenaNombreFecha, formatoFecha);
      return date.isValid();
    } catch (error) {
      console.error("Error Formato fecha", error)
    }
    return false;
  }

  static ValidateCoacreditadoByContract(_cs: CoacreditadosService){
    return  (control: AbstractControl) => {
      this.noContrato = control.value;
      return _cs.getCoacreditadoByContract(this.noContrato).pipe(
        delay(200),
        map( response => {
          if(response.length === 2) {
            return { no_available: true}
          }
          return null
        })
      );
    }
  }

  static ValidateTitularAvailable(_cs: CoacreditadosService){
    return  (control: AbstractControl) => {
      const value = control.value;
      return _cs.getTitularAvailable(this.noContrato).pipe(
        map( response  => {
          if(response && value === 2) {
            return { no_titular: true}
          } else if ( !response && value === 1){
            return { titular_no_available: true }
          }
          return null
        })
      );
    }
  }

  static ValidateCoacreditadoAvailable(_cs: CoacreditadosService){
    return  (control: AbstractControl) => {
      const value = control.value;
      return _cs.getCoacreditadoAvailable(this.noContrato).pipe(
        map( response  => {
          if ( !response && value === 2){
            return { coacreditado_no_available: true }
          }
          return null
        })
      );
    }
  }

  static ValidatePercentageByContract(_cs: CoacreditadosService){
    return  (control: AbstractControl) => {
      const value = parseInt(control.value);
      return _cs.getCoacreditadoByContract(this.noContrato).pipe(
        map( response => {
          if(response.length === 0 && (value === 0 || value === 50)) {
            return { no_assignable: true }
          } else if(response.length === 1) {
            const totalPer = response[0].porcentaje + value;
            if(totalPer > 100) {
              return { no_assignable: true }
            }
            return null
          }
          else if(response.length === 2) {
            return { no_assignable: true }
          }
          return null
        })
      );
    }
  }

}
