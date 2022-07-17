import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotivoCancelar } from '../../../../../model/motivo-cancelar.model';
import { DatosCancelar } from '../../../../../model/datos-cancelar.model';

@Component({
  selector: 'app-dlg-cancelar',
  templateUrl: './dlg-cancelar.component.html',
  styleUrls: ['./dlg-cancelar.component.css']
})
export class DlgCancelarComponent implements OnInit {

  cancelarForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<DlgCancelarComponent>,
    @Inject(MAT_DIALOG_DATA) public motivosCancelarList: MotivoCancelar[]) { 
      this.cancelarForm = this._fb.group({
        motivoId: ['', Validators.required],
        comentario: ['', Validators.required]
      });
  }

  ngOnInit(): void { }

  guardarCancelar(): void {
    if(this.cancelarForm.invalid) {
      this.cancelarForm.markAllAsTouched();
      return;
    }

    let datosCancelar = new DatosCancelar();
    datosCancelar.motivoId = this.cancelarForm.get('motivoId')?.value;
    datosCancelar.comentario = this.cancelarForm.get('comentario')?.value;

    this.dialogRef.close({event: 'Aceptar', data: datosCancelar});
  }

  close(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  campoNoValido(campo: string) {
    return this.cancelarForm.get(campo)?.invalid && this.cancelarForm.get(campo)?.touched;
  }
}
