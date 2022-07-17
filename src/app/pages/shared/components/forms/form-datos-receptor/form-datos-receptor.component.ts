import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-datos-receptor',
  templateUrl: './form-datos-receptor.component.html',
  styleUrls: ['./form-datos-receptor.component.css']
})
export class FormDatosReceptorComponent implements OnInit {
  @Input() formGroupName: string;
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
