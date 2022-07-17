import { FormCoacreditadoComponent } from './../../forms/form-coacreditado/form-coacreditado.component';
import { Component, OnInit, Inject, ViewChild, ComponentRef } from '@angular/core';
import { ComponentPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormCreaLineaComponent } from '../../forms/form-crea-linea/form-crea-linea.component';
import { FormClaconComponent } from '../../forms/form-clacon/form-clacon.component';
import { TypeModalEnum } from '../../../../../enum/type-modal';
import { EditarPorcentajesComponent } from 'src/app/pages/administracion/catalogos/coacreditados/editar-porcentajes/editar-porcentajes.component';

@Component({
  selector: 'dlg-form',
  templateUrl: './dlg-form.component.html',
  styleUrls: ['./dlg-form.component.scss']
})
export class DlgFormComponent implements OnInit{

  portal: ComponentPortal<CdkPortalOutlet>;
  @ViewChild(CdkPortalOutlet) portalRef: CdkPortalOutlet;
  typeModal: string = '';

  constructor(
    private dialogRef: MatDialogRef<DlgFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.portal = new ComponentPortal(this.data.component);
    this.typeModal = this.data?.type_modal;
  }

  onChildFormSubmit() {
    if(this.typeModal === TypeModalEnum.MODIFICACION_LINEA) {
      const cmf :ComponentRef< FormCreaLineaComponent > = this.portalRef.attachedRef as ComponentRef< FormCreaLineaComponent >;
      cmf.instance.crearEnLinea();
    } else if(this.typeModal === TypeModalEnum.AGREGAR_CLACON) {
      const cmf :ComponentRef< FormClaconComponent > = this.portalRef.attachedRef as ComponentRef< FormClaconComponent >;
      cmf.instance.saveClacon();
      if(cmf.instance.closeSave) this.dialogRef.close('confirm');
    } else if(this.typeModal === TypeModalEnum.MODIFICAR_CLACON) {
      const cmf :ComponentRef< FormClaconComponent > = this.portalRef.attachedRef as ComponentRef< FormClaconComponent >;
      cmf.instance.updateClacon();
      if(cmf.instance.closeSave) this.dialogRef.close('confirm');
    } else if(this.typeModal === TypeModalEnum.AGREGAR_COACREDITADO) {
      const cmf :ComponentRef< FormCoacreditadoComponent > = this.portalRef.attachedRef as ComponentRef< FormCoacreditadoComponent >;
      cmf.instance.addCoacreditado();
      if(cmf.instance.closeSave) this.dialogRef.close('confirm');
    } else if(this.typeModal === TypeModalEnum.MODIFICAR_COACREDITADO) {
      const cmf :ComponentRef< FormCoacreditadoComponent > = this.portalRef.attachedRef as ComponentRef< FormCoacreditadoComponent >;
      cmf.instance.addCoacreditado();
      if(cmf.instance.closeSave) this.dialogRef.close('confirm');
    }
  }
}
