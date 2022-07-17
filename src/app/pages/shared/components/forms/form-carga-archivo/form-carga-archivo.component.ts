import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Constantes } from '../../../../../common/constantes';
import { Utilerias } from '../../../../../common/utilerias';
import { TipoConstancia } from '../../../../../model/tipo-constancia.model';
import { EjercicioFiscal } from '../../../../../model/ejercicio-fiscal.model';
import { CargaArchivoService } from '../../../../principal/services/carga-archivo.service';
import { ValidatorService } from '../../../../principal/services/validator.service';
import { CatalogosService } from '../../../services/catalogos.service';

@Component({
  selector: 'app-form-carga-archivo',
  templateUrl: './form-carga-archivo.component.html',
  styleUrls: ['./form-carga-archivo.component.css']
})
export class FormCargaArchivoComponent implements OnInit {

  @Input() tipoLayoutMasivo: number;
  tituloCarga: string;
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  tiposConstanciaList: TipoConstancia[];
  ejerciciosFiscalesList: EjercicioFiscal[];
  form: FormGroup;

  constructor(
    private _fb                   : FormBuilder,
    private _vs                   : ValidatorService,
    private _cargaArchivoService  : CargaArchivoService,
    private _serviceCatalogos     : CatalogosService,
    private utilerias             : Utilerias,
  ) {
    this.form = this._fb.group({
      tipoConstancia  :['', Validators.required],
      fechaInicio     :[''],
      fechaFin        :[''],
      ejercicioFiscal :['', Validators.required],
      file            :['', Validators.required],
      sourceFile      :['', Validators.required, [this._vs]]
    })
  }

  ngOnInit(): void {
    if(this.tipoLayoutMasivo == Constantes.LAYOUT_MASIVO_CARGA) {
      this.tituloCarga = 'Creación masiva.';
    } else if(this.tipoLayoutMasivo == Constantes.LAYOUT_MASIVO_CANCELACION) {
      this.tituloCarga = 'Cancelación masiva.';
    }
    this.fillCatalogos();
  }

  validarDoc( evt : any ) {
    if (evt.target.files.length > 0) {
      const file = evt.target.files[0];
      this.form.patchValue({
        sourceFile: file
      });
    }
  }

  campoNoValido(campo:string){
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  submit(){
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('file', this.form.get('sourceFile')?.value);
    formData.append('ejerFiscal', this.form.get('ejercicioFiscal')?.value);
    formData.append('tipoConstancia', 'J');
    this._cargaArchivoService.enviaArchivo(formData)
      .subscribe({
          next: response => {
            this.utilerias.showDialogSuccess(response.operationResult.message);
          },
          error: (error) => {
            this.utilerias.showDialogError(error);
          }
        })
  }

  limpiarFormulario(){
    this.form.reset();
  }

  get fileErrorMsg(){
    const msg = this.form.get('sourceFile')?.errors
    if(msg?.['archivoVacio']){
        return "carga.masiva.error.vacio";
    }else if(msg?.['archivoNombre']){
        return "carga.masiva.error.nombre";
    }else if(msg?.['archivoExtension']){
        return "carga.masiva.error.extension";
    }else if(msg?.['archivoSize']){
        return "carga.masiva.error.tamanio";
    }
    return '';
  }

  get sourceFileName(){
    return this.form.get('sourceFile')?.value?.name;
  }

  get tipoConstanciaField() {
    return this.form.get('tipoConstancia');
  }

  get ejercicioFiscalField() {
    return this.form.get('ejercicioFiscal');
  }

  fillCatalogos(): void {
    this._serviceCatalogos.getTiposConstancia()
      .subscribe({
        next: response => {
          this.tiposConstanciaList = response;
        },
        error: error => {
          console.log(error);
        }
    });
    this._serviceCatalogos.getEjerciciosFiscales()
      .subscribe({
        next: response => {
          this.ejerciciosFiscalesList = response;
        },
        error: error => {
          console.log(error);
        }
    });
  }

  deleteFile() {
    this.form.get('sourceFile')?.reset();
  }
}
