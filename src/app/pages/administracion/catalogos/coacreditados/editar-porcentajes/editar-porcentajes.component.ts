import { FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoacreditadoModel } from 'src/app/model/coacreditado.model';
import { Utilerias } from 'src/app/common/utilerias';
@Component({
  selector: 'app-editar-porcentajes',
  templateUrl: './editar-porcentajes.component.html',
  styleUrls: ['./editar-porcentajes.component.scss']
})
export class EditarPorcentajesComponent implements OnInit {

  coacreditadosList: CoacreditadoModel[] = [];
  tipoPorcentajesList: any[] = [];
  listActive = false;
  idActive: number | string | undefined = 0;
  porcentajeField: FormControl = new FormControl();

  constructor(
    @Optional() private dialogRef: MatDialogRef<EditarPorcentajesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef,
    private utilerias: Utilerias
  ) { }

  edit() {
    console.log('edit');
  }

  ngOnInit(): void {
    this.cd.detectChanges();
    if(this.data?.response) {
      this.coacreditadosList =  this.data?.response;
    }
    if(this.data?.catPorcentajes) {
      this.tipoPorcentajesList = this.data?.catPorcentajes;
    }
  }


  editPorcentage(idCoac: number | string | undefined, porcentaje: any) {
    this.listActive = true;
    this.idActive = idCoac;
    this.porcentajeField.patchValue(porcentaje.toString());
  }

  confirmEditPorcentage(idCoac: number | string | undefined) {
    this.listActive = false;
    this.idActive = 0;
    const coacActive = this.coacreditadosList.find(coacreditado => coacreditado.id === idCoac);
    const coacInactive = this.coacreditadosList.find(coacreditado => coacreditado.id !== idCoac);
    if(coacActive?.porcentaje != this.porcentajeField.value) {
      const dialogRef = this.utilerias.showDialogConfirm('¿Estás seguro de realizar este cambio?');
      dialogRef.afterClosed().subscribe( response => {
        if(response) {
          if(coacActive) coacActive.porcentaje = parseInt(this.porcentajeField.value);
          if(coacInactive) coacInactive.porcentaje = 100 - parseInt(this.porcentajeField.value);
        }
      });
    }
  }

  returnColor(value: number | undefined) {
    if(value === 0) return 'red';
    if(value === 50) return 'orange';
    return 'green';
  }

}
