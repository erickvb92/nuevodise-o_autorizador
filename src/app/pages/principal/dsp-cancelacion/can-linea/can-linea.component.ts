import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Utilerias } from '../../../../common/utilerias';
import { Constantes } from '../../../../common/constantes';
import { appConstantsMessages } from '../../../../common/const.messages';
import { FormBusquedaConstanciasComponent } from '../../../shared/components/forms/form-busqueda-constancias/form-busqueda-constancias.component';
import { DlgComentarioComponent } from '../../../shared/components/dialogs/dlg-comentario/dlg-comentario.component';
import { DlgCancelarComponent } from '../../../shared/components/dialogs/dlg-cancelar/dlg-cancelar.component';
import { MotivoCancelar } from '../../../../model/motivo-cancelar.model';
import { ConstanciaCancelacion } from '../../../../model/constancia-cancelacion.model';
import { CancelacionService } from '../../services/cancelacion.service';
import { ExtraccionService } from '../../services/extraccion.service';
import { SelloCancelacion } from '../../../../model/sello-cancelacion.model';
import { ConstanciaRequestCfdi } from '../../../../model/constancia-request-cfdi.model';
import { ProcessCartService } from '../../services/process-cart.service';
import { FormFiltroTablaComponent } from 'src/app/pages/shared/components/forms/form-filtro-tabla/form-filtro-tabla.component';

@Component({
  selector: 'app-can-linea',
  templateUrl: './can-linea.component.html',
  styleUrls: ['./can-linea.component.css']
})
export class CanLineaComponent implements OnInit {

  tipoConsulta = Constantes.TIPO_CONSULTA_CANCELACION;
  motivosCancelarList: MotivoCancelar[];
  displayedColumns: string[];
  selection: SelectionModel<ConstanciaCancelacion>;
  divSellosSelected = document.createElement("div");

  @ViewChild(MatPaginator, {read: MatPaginator, static: false}) 
  paginator: MatPaginator;

  @ViewChild('formBusqueda', {read: FormBusquedaConstanciasComponent, static: false})
  private formBusqueda: FormBusquedaConstanciasComponent;

  @ViewChild('filterTable', {read: FormFiltroTablaComponent, static: false})
  private filterTable: FormFiltroTablaComponent;

  constructor(
    private cdref: ChangeDetectorRef,
    private utilerias: Utilerias,
    private service: CancelacionService,
    private _serviceExtraccion: ExtraccionService,
    private processCartService: ProcessCartService) {
      this.motivosCancelarList = new Array();
      this.displayedColumns = ['id', 'tipo', 'institucion', 'ejercicioFiscal', 'rfc', 'nombre', 'cod_cliente', 'cuenta', 'participacion_cliente', 'folio', 'estatus', 'cancelar', 'comentario', 'detalle'];
      this.selection = new SelectionModel<ConstanciaCancelacion>(true, []);
  }

  ngOnInit(): void {
    this.service.getMotivosCancelar()
      .subscribe({
        next: response => {
          this.motivosCancelarList = response;
        },
        error: error => {
          console.log(error);
        }
    });
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = Constantes.LABEL_REGISTROS_POR_PAGINA;
    this.paginator._intl.previousPageLabel = Constantes.LABEL_PAGINA_ANTERIOR;
    this.paginator._intl.nextPageLabel = Constantes.LABEL_PAGINA_SIGUIENTE;
    this.paginator._intl.firstPageLabel = Constantes.LABEL_PRIMERA_PAGINA;
    this.paginator._intl.lastPageLabel = Constantes.LABEL_ULTIMA_PAGINA;
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      return this.utilerias.getRangeLabelTables(page, pageSize, length);
    };
    this.cdref.detectChanges();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    let numRows = 0;
    this.formBusqueda.constanciasList.data.forEach(row => {
      if(!row.disabled) {
        numRows++;
      }
    });
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
    this.formBusqueda.constanciasList.data.forEach(row => {
      if(!row.disabled) {
        this.selection.select(<ConstanciaCancelacion>row);
      }
    });
    //se activa o desactivan los sellos de la constancia
    this.formBusqueda.constanciasList.data.forEach((row) => {
      if(!row.disabled) {
        let constancia = <ConstanciaCancelacion>row;
        let isAllSelected = this.isAllSelected();
        this.checkSellos(constancia.sellosCancelar, isAllSelected);
      }
    });
  }

  addComment(constancia: ConstanciaCancelacion) {
    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.data = constancia;
    dialogConfig.autoFocus = false;
    dialogConfig.role = 'alertdialog';
    const dialogRef = this.utilerias.showDialogWithConfig(DlgComentarioComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Agregar') {
        let rowData = result.data; 
        this.formBusqueda.constanciasList.data.filter((value) => {
          if(value.id == rowData.id){
            let constancia = <ConstanciaCancelacion>value;
            constancia.comentario = rowData.comentario;
            value = constancia;
          }
          return true;
        });
      }
    });
  }

  cancelar(isCancelar: boolean) {
    if(this.selection.selected == null || 
      (this.selection.selected != null && this.selection.selected.length === 0)) {
        this.utilerias.showDialogError(appConstantsMessages['table.selected.zero']);
        return;
    }
   
    let dialogRef = null;
    if(this.selection.selected.length > 1) {
      let dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.data = this.motivosCancelarList;
      dialogConfig.autoFocus = false;
      dialogConfig.role = 'alertdialog';
      dialogRef = this.utilerias.showDialogWithConfig(DlgCancelarComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if(result.event == 'Aceptar') {
          let datosCancelar = result.data; 
          this.formBusqueda.constanciasList.data.forEach((item) => {
            let constc = <ConstanciaCancelacion>item;
            constc.idMotivo = datosCancelar.motivoId;
            constc.comentario = datosCancelar.comentario;
          });
          isCancelar ? this.confirmCancelar(this.selection.selected) : this.saveConstanciasCart();
        }
      });
      return;
    }

    if (dialogRef == null) {
      let constSelected = this.selection.selected[0];
      if(constSelected.idMotivo == null ||
        (constSelected.idMotivo != null && constSelected.idMotivo == '')) {
          this.utilerias.showDialogError(appConstantsMessages['cancelacion.motivo.required']);
          return;
      }
      if(constSelected.comentario == null ||
        (constSelected.comentario != null && constSelected.comentario == '')) {
          this.utilerias.showDialogError(appConstantsMessages['cancelacion.comentario.required']);
          return;
      }
      isCancelar ? this.confirmCancelar(this.selection.selected) : this.saveConstanciasCart();
    }
  }

  verDetalle(constanciaId: string) {
    let botonesDettale = Array.from(document.getElementsByClassName("btnDetalle"));
    if(botonesDettale != null) {
      botonesDettale.forEach((btnPlus) =>{
        let icons = Array.from((<HTMLButtonElement>btnPlus).getElementsByTagName('mat-icon'));
        let iconPlus = icons[0];
        if(btnPlus.id == `plus${constanciaId}`) {
          if(iconPlus.innerHTML === 'add_circle_outline') {
            iconPlus.innerHTML = 'remove_circle_outline';
            let divsSellos = Array.from(document.getElementsByClassName("divSellos"));
            if(divsSellos != null) {
              divsSellos.forEach((tempDiv) =>{
                let divSellos = <HTMLDivElement>tempDiv;
                if(divSellos.id == `detalle${constanciaId}`) {
                  this.divSellosSelected = divSellos;
                } else {
                  // divSellos.style.display = 'none';
                  divSellos.classList.add('d-none');
                }
              });
            }
            this.fillSellosConstancia(constanciaId, this.divSellosSelected);
          } else {
            iconPlus.innerHTML = 'add_circle_outline';
            // this.divSellosSelected.style.display = 'none';
            this.divSellosSelected.classList.add('d-none');
          }
        } else {
          iconPlus.innerHTML = 'add_circle_outline';
        }
      });
    }
  }

  fillSellosConstancia(constanciaId: string, divSellos: HTMLDivElement): void {
    this.formBusqueda.constanciasList.data.forEach((value) => {
      if(value.id == constanciaId) {
        let constanciaSelected = <ConstanciaCancelacion>value;
        if(constanciaSelected.sellosCancelar == null || constanciaSelected.sellosCancelar.length == 0) {
          let constanciaCfdi: ConstanciaRequestCfdi = new ConstanciaRequestCfdi();
          constanciaCfdi.uuId = "1";
          constanciaCfdi.tipoConst = constanciaSelected.cveTipo;
          constanciaCfdi.ejercFis = constanciaSelected.ejercicioFiscal;
          constanciaCfdi.codigoCta = constanciaSelected.cuenta;
          constanciaCfdi.folio = constanciaSelected.folio;
          constanciaCfdi.canal = "5";
          this._serviceExtraccion.getSellosXml(constanciaCfdi)
            .subscribe({
              next: response => {
                let sellos = [{ nombre: 'constanciacf.xml', xml: response.dataResult.document, estatus: 'A' }];
                let isCancelar = this.selection.isSelected(constanciaSelected);
                let sellosCancelar: SelloCancelacion[] = new Array();
                sellos.forEach((sello) =>{
                  if(sello.estatus === Constantes.ESTATUS_INACTIVO) {
                    sellosCancelar.push({ cancelar: false, sello: sello, disabled: true });
                  } else {
                    sellosCancelar.push({ cancelar: isCancelar, sello: sello, disabled: false })
                  }
                });
                constanciaSelected.sellosCancelar = sellosCancelar;
                // divSellos.style.display = 'inline';
                divSellos.classList.remove('d-none');
              },
              error: error => {
                this.utilerias.showDialogError(error);
              }
            });
        } else {
          // divSellos.style.display = 'inline';
          divSellos.classList.remove('d-none');
        } 
        return;
      }
    });
  }

  checkConstancia(constanciaCheked: ConstanciaCancelacion) {
    this.selection.toggle(constanciaCheked);
    let isCancelar = this.selection.isSelected(constanciaCheked);
    this.checkSellos(constanciaCheked.sellosCancelar, isCancelar);
  }

  checkSello(event: any, selloCheked: SelloCancelacion) {
    selloCheked.cancelar = event.checked;
  }

  isAllSellosSelected(constanciaCheked: ConstanciaCancelacion) {
    let numSelected = 0;
    constanciaCheked.sellosCancelar.forEach((selloC) => {
      if(selloC.cancelar) {
        numSelected++;
      }
    });
    const numRows = constanciaCheked.sellosCancelar.length;
    return numSelected === numRows;
  }
  
  cleanSelection() {
    this.filterTable?.filterField.setValue('');
    if(this.selection.hasValue()) {
      this.selection.clear();
    }
  }

  checkSellos(sellosCancelar: SelloCancelacion[], isCheck: boolean) {
    sellosCancelar.forEach((selloC) => {
      if(!selloC.disabled) {
        selloC.cancelar = isCheck;
      }
    });
  }

  confirmCancelar(constanciasCancelar: ConstanciaCancelacion[]) {
    const dialogRef = this.utilerias.showDialogConfirm('¿Está seguro que desea cancelar las constancias seleccionadas?');
    dialogRef.afterClosed().subscribe( response =>  {
      if(response) {
        this.utilerias.showDialogSuccess(appConstantsMessages['cancelacion.cancelar.ok']);
      }
    });
  }

  saveConstanciasCart() {
    this.utilerias.showDialogSuccess(appConstantsMessages['cancelacion.agregar.ok']);
    this.processCartService.saveConstancias(this.selection.selected, 'constancias-canceladas');
  }

  onValueChangeInput(response: boolean) {
    if(response) {
      this.selection.clear();
    }
  }
}
