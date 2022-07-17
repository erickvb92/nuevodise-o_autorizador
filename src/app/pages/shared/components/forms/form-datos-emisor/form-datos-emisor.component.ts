import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Institucion } from 'src/app/model/institucion.model';

@Component({
  selector: 'app-form-datos-emisor',
  templateUrl: './form-datos-emisor.component.html',
  styleUrls: ['./form-datos-emisor.component.css']
})
export class FormDatosEmisorComponent implements OnInit {
  institucionesList: Institucion[];
  @Input() formGroupName: string;
  @Input() set instituciones(data: Institucion[]) {
    if (data) {
      this.institucionesList = data;
    }
  };
  form: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  campoNoValido(campo:string){
    return this.form?.get(campo)?.invalid && this.form?.get(campo)?.touched;
  }

}
