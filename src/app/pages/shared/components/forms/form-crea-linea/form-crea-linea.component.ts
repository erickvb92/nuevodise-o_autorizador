import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Utilerias } from 'src/app/common/utilerias';
import { ConstanciaInformacionControls, ConstanciaInformacionFormGroup } from './../../../../../model/constancia-informacion.model';
import { EjercicioFiscal } from 'src/app/model/ejercicio-fiscal.model';
import { Institucion } from 'src/app/model/institucion.model';
import { TipoConstancia } from 'src/app/model/tipo-constancia.model';
import { CatalogosService } from '../../../services/catalogos.service';
import { ProcessCartService } from 'src/app/pages/principal/services/process-cart.service';

@Component({
  selector: 'app-form-crea-linea',
  templateUrl: './form-crea-linea.component.html',
  styleUrls: ['./form-crea-linea.component.css']
})
export class FormCreaLineaComponent implements OnInit {
  @Input() emisorFormGroup: boolean;
  @Input() receptorFormGroup: boolean;
  @Input() operacionFormGroup: boolean;
  @Input() saveInmemory: boolean;
  formCreacion: FormGroup;

  tiposConstanciaList: TipoConstancia[];
  ejerciciosFiscalesList: EjercicioFiscal[];
  institucionesList: Institucion[];
  isSello : boolean = false;

  constructor(
    private fb: FormBuilder,
    private utilerias: Utilerias,
    private catalogosService: CatalogosService,
    private processCartService: ProcessCartService,
    @Optional() private dialogRef: MatDialogRef<FormCreaLineaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(this.data) {
      this.emisorFormGroup = data.emisor_group;
      this.receptorFormGroup = data.receptor_group;
      this.operacionFormGroup = data.operacion_group;
      this.saveInmemory = data.save
      this.isSello = data.isSello
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.fillCatalogos();
  }

  ngAfterViewInit(): void {
  }

  initForm() {
    this.formCreacion = this.fb.group({
      general: this.fb.group({
        ejercicio       : ['', [Validators.required]],
        periodo         : ['', [Validators.required]],
        tipoConstancia  : ['', [Validators.required]],
        folioInterno    : ['', [Validators.required]],
        claveRetencion  : ['', [Validators.required]],
        descRetencion   : ['', [Validators.required]],
        aField          : ['', [Validators.required]]
      }),
      datosEmisor: this.fb.group({
        institucion         : ['', [Validators.required]],
        rfc                 : ['', [Validators.required]],
        calle               : ['', [Validators.required]],
        noExt               : ['', [Validators.required]],
        noInt               : ['', [Validators.required]],
        cp                  : ['', [Validators.required]],
        colonia             : ['', [Validators.required]],
        delegacionMunicipio : ['', [Validators.required]],
        estado              : ['', [Validators.required]],
        pais                : ['', [Validators.required]],
        regimenFiscal       : ['', [Validators.required]],
        lugarExpedicion     : ['', [Validators.required]]
      }),
      datosReceptor: this.fb.group({
        nombreRazonSocial   : ['', [Validators.required]],
        rfc                 : ['', [Validators.required]],
        numProv             : ['', [Validators.required]],
        curp                : ['', [Validators.required]],
        nacionalidad        : ['', [Validators.required]],
        cp                  : ['', [Validators.required]],
        colonia             : ['', [Validators.required]],
        calle               : ['', [Validators.required]],
        noExt               : ['', [Validators.required]],
        noInt               : ['', [Validators.required]],
        delegacionMunicipio : ['', [Validators.required]],
        estado              : ['', [Validators.required]],
        pais                : ['', [Validators.required]],
        paisResidencia      : ['', [Validators.required]],
        esBenefEfect        : ['', [Validators.required]],
        conceptoPago        : ['', [Validators.required]],
        descripcionConcepto : ['', [Validators.required]]
      }),
      datosOperacion: this.fb.group({
        baseRetencionIsr    : ['', [Validators.required]],
        impuestoRetenidoIsr : ['', [Validators.required]],
        tipoRetencionIsr    : ['', [Validators.required]],
        baseRetencionIva    : ['', [Validators.required]],
        impuestoRetenidoIva : ['', [Validators.required]],
        tipoRetencionIva    : ['', [Validators.required]],
        montoTotalOperacion : ['', [Validators.required]],
        montoTotalGravado   : ['', [Validators.required]],
        montoTotalExento    : ['', [Validators.required]],
        montoTotalRetenido  : ['', [Validators.required]]
      }),
    } as ConstanciaInformacionControls) as ConstanciaInformacionFormGroup
    if(this.saveInmemory){
      this.formCreacion.patchValue(this.data.constancia.ConstanciaInformacion);
    }
    this.validateFormGroups();
  }

  validateFormGroups() {
    if(!this.emisorFormGroup) this.formCreacion.removeControl('datosEmisor');
    if(!this.receptorFormGroup) this.formCreacion.removeControl('datosReceptor');
    if(!this.operacionFormGroup) this.formCreacion.removeControl('datosOperacion');
  }

  fillCatalogos(): void {
    forkJoin([
      this.catalogosService.getTiposConstancia(),
      this.catalogosService.getInstituciones()
    ]).subscribe({
      next: ([response1, response2]) => {
        this.tiposConstanciaList = response1;
        this.institucionesList = response2;
      },
      error: error => console.error(error)
    }
    );
  }

  campoNoValido(grupo:string, campo:string){
    return this.formCreacion.get(grupo)?.get(campo)?.invalid && this.formCreacion.get(grupo)?.get(campo)?.touched;
  }

  crearEnLinea() {
    if(this.formCreacion.invalid) {
      this.formCreacion.markAllAsTouched();
    }else {
      this.utilerias.showDialogSuccess('Su operación fue exitosa. Se genero el folio: AR-0000000001');
      this.data.constancia.ConstanciaInformacion = this.formCreacion.value;
      if(this.saveInmemory) {
        this.saveLocalStorage();
        this.dialogRef.close();
      }
    }
  }

  saveLocalStorage() {
    this.processCartService.saveConstancias([this.data.constancia], 'constancias-modificadas');
  }

  cancelar() {
    if(this.saveInmemory) {
      this.dialogRef.close();
    }
  }
}
