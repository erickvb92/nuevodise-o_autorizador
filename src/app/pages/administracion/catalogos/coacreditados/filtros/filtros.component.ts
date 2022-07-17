import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EjercicioFiscal } from 'src/app/model/ejercicio-fiscal.model';
import { Institucion } from 'src/app/model/institucion.model';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {
  inputsDisabled: boolean;
  filters: FormGroup;
  @Input() instituciones: Institucion[];
  @Input() set isDisabled(action: boolean){
    this.inputsDisabled = action;
  }
  @Input() ejercicioFiscalList: EjercicioFiscal[];
  @Output() valueFiilters = new EventEmitter<any>();
  @Output() cleanFilter = new EventEmitter<boolean>(false);

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.ToogleInputs();
  }

  ngAfterContentChecked(): void {
    this.ToogleInputs();
  }

  initForm() {
    this.filters = this._fb.group({
      contrato: [''],
      codigoCliente: [''],
      rfc: [''],
      institucion: [''],
      ejercicioFiscal: ['']
    })
  }

  ToogleInputs(){
    if(this.inputsDisabled) {
      this.filters.disable();
    } else {
      this.filters.enable();
    }
  }

  limpiarConsulta() {
    this.cleanFilter.emit(true);
    this.filters.reset();
  }

  get contratoField() {
    return this.filters.get('contrato');
  }

  get subcontratoField() {
    return this.filters.get('codigoCliente');
  }

  get rfcField() {
    return this.filters.get('rfc');
  }

  searchFilters() {
    const filterValues = {
      contrato: this.contratoField?.value,
      subcontrato: this.subcontratoField?.value,
      rfc: this.rfcField?.value
    };

    this.valueFiilters.emit(filterValues);
  }

}
