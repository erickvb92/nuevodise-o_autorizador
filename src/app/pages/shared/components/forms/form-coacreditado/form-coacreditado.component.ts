import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Utilerias } from 'src/app/common/utilerias';
import { ClaconesService } from 'src/app/pages/administracion/services/clacones.service';
import { CoacreditadosService } from 'src/app/pages/administracion/services/coacreditados.service';
import { NewClaclonModel } from '../../../../../model/caclones.model';
import { TipoCoacreditadoModel, CreateCoacreditadoModel } from './../../../../../model/coacreditado.model';
import { MyValidations } from './../../../../../common/my-validations';

@Component({
  selector: 'app-form-coacreditado',
  templateUrl: './form-coacreditado.component.html',
  styleUrls: ['./form-coacreditado.component.scss']
})
export class FormCoacreditadoComponent implements OnInit {

  form: FormGroup;
  tipoCoacreditadosList: TipoCoacreditadoModel[] = [];
  tipoPorcentajesList: any[] = [];
  alfRegEx = /^[A-Za-z0-9\s]+$/;
  onlyNumRegEx = /^[0-9]*$/;
  rfcRegEx = /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z|\d]{3})?$/;
  closeSave: boolean = false;
  fieldTouched: string = '';
  isEdit: boolean  = false;

  constructor(
    private fb: FormBuilder,
    private _cs: CoacreditadosService,
    private claconesService: ClaconesService,
    @Optional() private dialogRef: MatDialogRef<FormCoacreditadoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private utilerias: Utilerias,
  ) {}

  ngOnInit(): void {
    this.initForm();
    if(this.data?.dataCoacreditado) {
      this.form.patchValue(this.data?.dataCoacreditado);
      this.tipoSolicitanteField?.patchValue(this.data.dataCoacreditado?.solicitante?.id);
      this.porcentajeField?.patchValue(this.data.dataCoacreditado?.porcentaje.toString());
      this.contratoField?.disable();
      this.porcentajeField?.disable();
      this.tipoSolicitanteField?.disable();
      this.isEdit = true;
    }
    if(this.data?.catCoacreditados && this.data?.catPorcentajes) {
      this.tipoCoacreditadosList = this.data?.catCoacreditados;
      this.tipoPorcentajesList = this.data?.catPorcentajes;
    }
  }

  initForm() {
    this.form = this.fb.group({
      contrato: ['',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.pattern(this.alfRegEx)
        ],
        MyValidations.ValidateCoacreditadoByContract(this._cs)],
      subcontrato: ['',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(this.onlyNumRegEx)
        ]
      ],
      nombreCompleto: ['',
        [
          Validators.required,
          Validators.pattern(this.alfRegEx)
        ]
      ],
      idSolicitante: ['',
        [Validators.required],
        [
          MyValidations.ValidateTitularAvailable(this._cs),
          MyValidations.ValidateCoacreditadoAvailable(this._cs)
        ]
      ],
      porcentaje: ['',
        [Validators. required],
        MyValidations.ValidatePercentageByContract(this._cs)
      ],
      calle: ['', [Validators.required]],
      noExt: ['', [Validators.required]],
      noInt: ['', []],
      colonia: ['', [Validators.required]],
      cp: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern(this.onlyNumRegEx)
      ]],
      delegacion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      rfc: ['',
        [
          Validators.required,
          Validators.pattern(this.rfcRegEx)
        ]
      ]
    });
    if(!this.contratoField?.value) {
      this.tipoSolicitanteField?.disable();
      this.porcentajeField?.disable();
    }
    this.contratoField?.valueChanges.subscribe( value => {
      if (value && !this.isEdit) {
        this.tipoSolicitanteField?.enable();
        this.porcentajeField?.enable();
      } else {
        this.tipoSolicitanteField?.setValue('');
        this.tipoSolicitanteField?.disable();
        this.porcentajeField?.setValue('');
        this.porcentajeField?.disable();
      }
    });
  }

  campoNoValido(campo:string){
    this.fieldTouched = ''
    this.fieldTouched = campo;
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  getError(error: any): any {
    if(error?.['required']) {
      return 'Campo requerido';
    }
    if(error?.['maxlength']) {
      return `Campo no puede ser mayor a ${error?.['maxlength'].requiredLength} caracteres`;
    }
    if(error?.['minlength']) {
      return `Campo no puede ser menor a ${error?.['minlength'].requiredLength} caracteres`;
    }
    if(error?.no_available) {
      return 'Este contrato ya cuenta con titular y coacreditado';
    }
    if(error?.no_titular) {
      return 'Debe existir un titular para este contrato antes que un coacreditado';
    }
    if(error?.titular_no_available) {
      return 'Ya existe un titular registrado para ese contrato';
    }
    if(error?.coacreditado_no_available) {
      return 'Ya existe un coacreditado registrado para ese contrato';
    }
    if(error?.no_assignable) {
      return 'Porcentaje no valido para este contrato';
    }
    if(error?.['pattern'].requiredPattern === `${this.alfRegEx}`) {
      return 'Campo solo acepta caracteres alfanuméricos';
    }
    if(error?.['pattern'].requiredPattern === `${this.onlyNumRegEx}`) {
      return 'Campo solo acepta caracteres numéricos';
    }
    if(error?.['pattern'].requiredPattern === `${this.rfcRegEx}`) {
      return 'La estructura del RFC es incorrecta';
    }
  }

  addCoacreditado() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.closeSave = false;
    } else {
      const value = this.form.value;
      const newCoac: CreateCoacreditadoModel = {
        ...value,
        contrato: this.contratoField?.value,
        idSolicitante: this.tipoSolicitanteField?.value,
        porcentaje: parseInt(this.porcentajeField?.value),
        fecha: new Date()
      };

      if(!this.isEdit) {
        this._cs.saveCoacreditado(newCoac).subscribe({
          next: response => {
            this.closeSave = true;
            this.utilerias.showDialogSuccess(response.message);
          },
          error: error => console.warn(error)
        });
      } else {
        this._cs.updateCoacreditado(this.data.dataCoacreditado?.id, newCoac).subscribe({
          next: response => {
            this.closeSave = true;
            this.utilerias.showDialogSuccess(response.message);
          },
          error: error => console.warn(error)
        });
      }

    }
  }



  get contratoField() {
    return this.form.get('contrato');
  }

  get subcontratoField() {
    return this.form.get('subcontrato');
  }

  get nombreField() {
    return this.form.get('nombreCompleto');
  }

  get tipoSolicitanteField() {
    return this.form.get('idSolicitante');
  }

  get porcentajeField() {
    return this.form.get('porcentaje');
  }

  get calleField() {
    return this.form.get('calle');
  }

  get noExtField() {
    return this.form.get('noExt');
  }

  get noIntField() {
    return this.form.get('noInt');
  }

  get coloniaField() {
    return this.form.get('colonia');
  }

  get cpField() {
    return this.form.get('cp');
  }

  get delegacionField() {
    return this.form.get('delegacion');
  }

  get estadoField() {
    return this.form.get('estado');
  }

  get rfcField() {
    return this.form.get('rfc');
  }


}
