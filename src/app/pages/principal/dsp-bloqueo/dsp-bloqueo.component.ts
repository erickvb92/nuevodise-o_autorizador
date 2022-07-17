import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SelectionModel } from '@angular/cdk/collections';
import { Constantes } from '../../../common/constantes';
import { Utilerias } from '../../../common/utilerias';
import { Estatus } from '../../../common/estatus';
import { appConstantsMessages } from '../../../common/const.messages';
import { FormBusquedaConstanciasComponent } from '../../shared/components/forms/form-busqueda-constancias/form-busqueda-constancias.component';
import { ConstanciaBloqueo } from '../../../model/constancia-bloqueo.model';
import { BloqueoService } from '../services/bloqueo.service';
import { FormFiltroTablaComponent } from '../../shared/components/forms/form-filtro-tabla/form-filtro-tabla.component';

@Component({
  selector: 'app-dsp-bloqueo',
  templateUrl: './dsp-bloqueo.component.html',
  styleUrls: ['./dsp-bloqueo.component.css']
})
export class DspBloqueoComponent implements OnInit {

  tipoConsulta = Constantes.TIPO_CONSULTA_BLOQUEO;
  displayedColumns: string[];
  selection: SelectionModel<ConstanciaBloqueo>;
 
  @ViewChild(MatPaginator, {read: MatPaginator, static: false}) 
  paginator: MatPaginator;

  @ViewChild('formBusqueda', {read: FormBusquedaConstanciasComponent, static: false})
  private formBusqueda: FormBusquedaConstanciasComponent;

  @ViewChild('filterTable', {read: FormFiltroTablaComponent, static: false})
  private filterTable: FormFiltroTablaComponent;

  constructor(
    private cdref: ChangeDetectorRef,
    private utilerias: Utilerias,
    private bloqueoService: BloqueoService) { 
      this.displayedColumns = ['id', 'tipo', 'institucion', 'ejercicioFiscal', 'rfc', 'nombre', 'cod_cliente', 'cuenta', 'participacion_cliente', 'folio', 'estatus', 'bloquearDesbloquear'];
      this.selection = new SelectionModel<ConstanciaBloqueo>(true, []);
  }

  ngOnInit(): void {
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

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.formBusqueda.constanciasList.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
    this.formBusqueda.constanciasList.data.forEach(row => this.selection.select(<ConstanciaBloqueo>row));
  }

  bloquearDesbloquearConstancia(constancia: ConstanciaBloqueo, event: MatSlideToggleChange) {
    if(event.checked) {
      this.bloqueoService.bloquearCF(constancia)
      .subscribe({
          next: response => {
            this.utilerias.showDialogSuccess(appConstantsMessages['bloqueo.bloqueo.success']);
          },
          error: (error) => {
            this.resetConstancia(constancia.id, event.checked);
            this.utilerias.showDialogError(error.mensaje);
          }
      });
    } else {
      this.bloqueoService.desbloquearCF(constancia)
      .subscribe({
          next: response => {
            this.utilerias.showDialogSuccess(appConstantsMessages['bloqueo.desbloqueo.success']);
          },
          error: (error) => {
            this.resetConstancia(constancia.id, event.checked);
            this.utilerias.showDialogError(error.mensaje);
          }
      });
    }

    // quitar codigo cuando se integre con microservicio
    if(this.formBusqueda.constanciasList.data != null && this.formBusqueda.constanciasList.data.length > 0) {
      this.formBusqueda.constanciasList.data.forEach((temp) => {
        let constBloq = <ConstanciaBloqueo>temp;
        if(constBloq.id === constancia.id) {
            if(event.checked) {
              constBloq.bloqueo = event.checked;
              constBloq.estatus = Estatus.BLOQUEADO.descEstatus
            } else {
              constBloq.bloqueo = event.checked;
              constBloq.estatus = Estatus.DISPONIBLE.descEstatus
            }
        }
      });
    }
  }

  bloquearDesbloquear(isBloquear: boolean) {
    if(this.selection.selected == null || 
      (this.selection.selected != null && this.selection.selected.length === 0)) {
        this.utilerias.showDialogError(appConstantsMessages['table.selected.zero']);
        return;
    }

    let messageConfirm = '';
    if(isBloquear) {
      messageConfirm = '¿Está seguro que desea bloquear las constancias seleccionadas?';
    } else {
      messageConfirm = '¿Está seguro que desea desbloquear las constancias seleccionadas?';
    }

    const dialogRef = this.utilerias.showDialogConfirm(messageConfirm);
    dialogRef.afterClosed().subscribe( response =>  {
      if(response) {
        if(isBloquear) {
          //this.formBusqueda.consultarCF();
          this.utilerias.showDialogSuccess(appConstantsMessages['bloqueo.bloqueo.masivo.success']);
        } else {
          //this.formBusqueda.consultarCF();
          this.utilerias.showDialogSuccess(appConstantsMessages['bloqueo.desbloqueo.masivo.success']);
        }
        // quitar codigo cuando se integre con microservicio
        if(this.formBusqueda.constanciasList.data != null && this.formBusqueda.constanciasList.data.length > 0) {
          this.formBusqueda.constanciasList.data.forEach((temp) => {
            let constBloq = <ConstanciaBloqueo>temp;
            this.selection.selected.forEach((selected) => {
              if(constBloq.id === selected.id) {
                if(isBloquear) {
                  constBloq.bloqueo = isBloquear;
                  constBloq.estatus = Estatus.BLOQUEADO.descEstatus
                } else {
                  constBloq.bloqueo = isBloquear;
                  constBloq.estatus = Estatus.DISPONIBLE.descEstatus
                }
              }
            });
          });
        }
        this.cleanSelection();
      }
    });
  }

  cleanSelection() {
    this.filterTable?.filterField.setValue('');
    if(this.selection.hasValue()) {
      this.selection.clear();
    }
  }

  private resetConstancia(constanciaId: string, checked: boolean): void {
    this.formBusqueda.constanciasList.data.forEach((constancia) => {
      if(constancia.id === constanciaId) {
        let constanciaBloqueo = <ConstanciaBloqueo>constancia;
        constanciaBloqueo.bloqueo = !checked;
      }
    });
  }

  generarDescarga(formatoDescarga: string) {    
    let constanciasExport = new Array();
    this.selection.selected.forEach((constSelected) => {
      constanciasExport.push([constSelected.tipo, constSelected.institucion, 
        constSelected.ejercicioFiscal, constSelected.rfc, constSelected.nombre,
        constSelected.cod_cliente, constSelected.cuenta, constSelected.participacion_cliente,
        constSelected.folio, constSelected.estatus ]);
    });

    const header = ["Tipo de constancia", "Institución", "Ejercicio fiscal", "RFC cliente", 
      "Nombre cliente", "Código cliente", "Número de cuenta/proveedor", "Participación del cliente", "Folio constancia", "Estatus"];
    
    this.utilerias.exportData(formatoDescarga, header, 'Constancias fiscales', constanciasExport);
  }

  onValueChangeInput(response: boolean) {
    if(response) {
      this.selection.clear();
    }
  }
}
