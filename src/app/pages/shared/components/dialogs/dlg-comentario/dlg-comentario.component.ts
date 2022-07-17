import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConstanciaCancelacion } from '../../../../../model/constancia-cancelacion.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dlg-cancelar',
  templateUrl: './dlg-comentario.component.html',
  styleUrls: ['./dlg-comentario.component.css']
})
export class DlgComentarioComponent implements OnInit {

  comentarioForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<DlgComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConstanciaCancelacion) { 
      this.comentarioForm = this._fb.group({
        comentario: [data.comentario, Validators.required]
      });
  }

  ngOnInit(): void {
  }

  agregar(): void {
    if(this.comentarioForm.invalid) {
      this.comentarioForm.markAllAsTouched();
      return;
    }

    let local_data = this.data;
    local_data.comentario = this.comentarioForm.get('comentario')?.value;
    this.dialogRef.close({event: 'Agregar', data: local_data});
  }

  close(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  campoNoValido(campo: string) {
    return this.comentarioForm.get(campo)?.invalid && this.comentarioForm.get(campo)?.touched;
  }
}
