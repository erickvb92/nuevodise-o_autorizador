import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ClaveClaconesModel, SubClaveClaconesModel, NombreClaconesModel, OrigenClaconesModel, DivisaClaconesModel } from 'src/app/model/catalogos-caclones.model';
import { ClaconesService } from 'src/app/pages/administracion/services/clacones.service';
import { NewClaclonModel } from './../../../../../model/caclones.model';
import { AdminCatalogosService } from '../../../../administracion/services/admin-catalogos.service';

@Component({
  selector: 'app-form-clacon',
  templateUrl: './form-clacon.component.html',
  styleUrls: ['./form-clacon.component.scss']
})
export class FormClaconComponent implements OnInit {

  form: FormGroup;
  clavesClaconesList: ClaveClaconesModel[] = [];
  subclavesClaconesList: SubClaveClaconesModel[] = [];
  nombreClaconesList: NombreClaconesModel[] = [];
  origenClaconesList: OrigenClaconesModel[] = [];
  divisasClaconesList: DivisaClaconesModel[] = [];
  alfRegEx = /^[A-Za-z0-9\s]+$/;
  closeSave: boolean = false;
  fieldTouched: string = '';

  constructor(
    private fb: FormBuilder,
    private catalogosService: AdminCatalogosService,
    private claconesService: ClaconesService,
    @Optional() private dialogRef: MatDialogRef<FormClaconComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCatalogos();
    if(this.data?.dataClacon) {
      this.form.patchValue(this.data?.dataClacon);
      this.claveField?.patchValue(this.data?.dataClacon?.clave?.id);
      this.subclaveField?.patchValue(this.data?.dataClacon?.subclave?.id);
      this.nombreField?.patchValue(this.data?.dataClacon?.nombre?.id);
      this.origenField?.patchValue(this.data?.dataClacon?.origen?.id);
      this.divisaField?.patchValue(this.data?.dataClacon?.divisa?.id);
    }
    this.claveField?.valueChanges.subscribe({
      next: response => {
        const idClave = response;
        if(idClave === '2') {
          console.log(response);
          this.codigoField?.reset();
          this.codigoField?.setValidators([Validators.maxLength(4), Validators.pattern(this.alfRegEx)]);
        } else {
          this.codigoField?.setValidators([Validators.required, Validators.maxLength(4), Validators.pattern(this.alfRegEx)]);
        }
        this.codigoField?.updateValueAndValidity();
      }
    })
  }

  initForm() {
    this.form = this.fb.group({
      clave: ['', [Validators.required, Validators.maxLength(6)]],
      subclave: ['', [Validators.required, Validators.maxLength(5)]],
      codigo: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(this.alfRegEx)]],
      indicadorA: ['', [Validators.maxLength(1),  Validators.pattern(this.alfRegEx)]],
      indicadorB: ['', [Validators.maxLength(1),  Validators.pattern(this.alfRegEx)]],
      nombre: ['', [Validators.maxLength(6)]],
      origen: ['', [Validators.required, Validators.maxLength(11)]],
      complemento: ['', [Validators.maxLength(6),  Validators.pattern(this.alfRegEx)]],
      divisa: ['', [Validators.maxLength(3)]],
      descripcion: ['', [Validators.maxLength(30),  Validators.pattern(this.alfRegEx)]],
      detalle: ['', [Validators.maxLength(50),  Validators.pattern(this.alfRegEx)]],
    })
  }

  getCatalogos(): void{
    forkJoin([
      this.catalogosService.getClabeTipoClacones(),
      this.catalogosService.getSubClaveTipoClacones(),
      this.catalogosService.getNombreTipoClacones(),
      this.catalogosService.getOrigenTipoClacones(),
      this.catalogosService.getDivisaTipoClacones()
    ]).subscribe({
        next: ([response1, response2, response3, response4, response5])=> {
          this.clavesClaconesList = response1;
          this.subclavesClaconesList = response2;
          this.nombreClaconesList = response3;
          this.origenClaconesList = response4;
          this.divisasClaconesList = response5;
        },
        error: error => console.error(error)
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
    if(error?.['pattern'].requiredPattern === `${this.alfRegEx}`) {
      return 'Campo solo acepta caracteres alfanuméricos'
    }
  }

  saveClacon() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.closeSave = false;
    } else {
      const value = this.form.value;
      const newClacon: NewClaclonModel = {
        idClave: value?.clave,
        idSubclave: value?.subclave,
        codigo: value?.codigo,
        indicadorA: value?.indicadorA,
        indicadorB: value?.indicadorB,
        idNombre: value?.nombre,
        idOrigen: value?.origen,
        complemento: value?.complemento,
        idDivisa: value?.divisa,
        descripcion: value?.descripcion,
        detalle: value?.detalle
      };

      this.claconesService.addNewClacon(newClacon).subscribe({
        next: response => {
          this.closeSave = true;
        },
        error: error => console.error(error)
      });
    }
  }

  updateClacon() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.closeSave = false;
    } else {
      const value = this.form.value;
      const newClacon: NewClaclonModel = {
        idClave: value?.clave,
        idSubclave: value?.subclave,
        codigo: value?.codigo,
        indicadorA: value?.indicadorA,
        indicadorB: value?.indicadorB,
        idNombre: value?.nombre,
        idOrigen: value?.origen,
        complemento: value?.complemento,
        idDivisa: value?.divisa,
        descripcion: value?.descripcion,
        detalle: value?.detalle
      };

      this.claconesService.updateClacon(this.data?.dataClacon?.id, newClacon).subscribe({
        next: response => {
          this.closeSave = true;
        },
        error: error => console.error(error)
      });
    }
  }

  get claveField() {
    return this.form.get('clave');
  }

  get subclaveField() {
    return this.form.get('subclave');
  }

  get codigoField() {
    return this.form.get('codigo');
  }

  get indicadorAField() {
    return this.form.get('indicadorA');
  }

  get indicadorBField() {
    return this.form.get('indicadorB');
  }

  get nombreField() {
    return this.form.get('nombre');
  }

  get origenField() {
    return this.form.get('origen');
  }

  get complementoField() {
    return this.form.get('complemento');
  }

  get divisaField() {
    return this.form.get('divisa');
  }

  get descripcionField() {
    return this.form.get('descripcion');
  }

  get detalleField() {
    return this.form.get('detalle');
  }


}
