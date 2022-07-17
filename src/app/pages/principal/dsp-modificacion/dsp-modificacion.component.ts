import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Constantes } from '../../../common/constantes';
import { FormBusquedaConstanciasComponent } from '../../shared/components/forms/form-busqueda-constancias/form-busqueda-constancias.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ConstanciaModificacion } from 'src/app/model/constancia-modificacion.model';
import { Utilerias } from './../../../common/utilerias';
import { FormCreaLineaComponent } from './../../shared/components/forms/form-crea-linea/form-crea-linea.component';
import { DlgFormComponent } from '../../shared/components/dialogs/dlg-form/dlg-form.component';
import { DlgComentarioComponent } from '../../shared/components/dialogs/dlg-comentario/dlg-comentario.component';
import { ModificacionService } from '../services/modificacion.service';
import { FormFiltroTablaComponent } from '../../shared/components/forms/form-filtro-tabla/form-filtro-tabla.component';
import { TypeModalEnum } from '../../../enum/type-modal';

@Component({
  selector: 'app-dsp-modificacion',
  templateUrl: './dsp-modificacion.component.html',
  styleUrls: ['./dsp-modificacion.component.css']
})
export class DspModificacionComponent implements OnInit, AfterViewChecked {

  tipoConsulta = Constantes.TIPO_CONSULTA_MODIFICACION;

  @ViewChild('table') table : ElementRef;
  selection: SelectionModel<ConstanciaModificacion>;
  displayedColumns: string[];
  
  @ViewChild(MatPaginator, {read: MatPaginator, static: false}) 
  paginator: MatPaginator;

  @ViewChild('formBusqueda', {read: FormBusquedaConstanciasComponent, static: false})
  private formBusqueda: FormBusquedaConstanciasComponent;

  @ViewChild('filterTable', {read: FormFiltroTablaComponent, static: false})
  private filterTable: FormFiltroTablaComponent;
  
  /* Fomulario Creacion */
  emisorFormGroup : boolean = true;
  receptorFormGroup: boolean = true;
  operacionFormGroup: boolean = true;

  labelBtnExportar: string;
  iconExportar: string;
  disabledExportar: boolean;
  
  constructor(
    private _cdRef:ChangeDetectorRef,
    private _utilerias: Utilerias,
    private _serviceModificacion: ModificacionService) {
      this.displayedColumns = ['id', 'tipo', 'institucion', 'ejercicioFiscal', 'rfc', 'nombre', 'cod_cliente', 'cuenta', 'participacion_cliente', 'folio', 'estatus', 'editar'];
      this.selection = new SelectionModel<ConstanciaModificacion>(true, []);
  }

  ngOnInit(): void { 
    this.labelBtnExportar = Constantes.LABEL_BTN_HABILITAR_EXPORT;
    this.iconExportar = 'get_app';
    this.disabledExportar = true;
  }
 
  ngAfterViewChecked() {
    this.paginator._intl.itemsPerPageLabel = Constantes.LABEL_REGISTROS_POR_PAGINA;
    this.paginator._intl.previousPageLabel = Constantes.LABEL_PAGINA_ANTERIOR;
    this.paginator._intl.nextPageLabel = Constantes.LABEL_PAGINA_SIGUIENTE;
    this.paginator._intl.firstPageLabel = Constantes.LABEL_PRIMERA_PAGINA;
    this.paginator._intl.lastPageLabel = Constantes.LABEL_ULTIMA_PAGINA;
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      return this._utilerias.getRangeLabelTables(page, pageSize, length);
    };
    this._cdRef.detectChanges();
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
        this.selection.select(row)
      }
    });
  }

  dlgEditarConstancia(constancia:ConstanciaModificacion) {
    this._serviceModificacion.getConstanciaInformacion(constancia)
      .subscribe({
        next: (constanciaInformacion) => {
          constancia.ConstanciaInformacion = constanciaInformacion;
          this._utilerias.showDialogWithConfig(DlgComentarioComponent, {
            data :  {comentario : ''},
            autoFocus :  false, 
            role :  'alertdialog', 
          }).afterClosed().subscribe(result => {
            if(result && result.event === "Agregar") {
              constancia.comentario = result.data.comentario;
              this._utilerias.showDialogWithConfig(DlgFormComponent, {
                  width: "80%", height: "unset",
                  data: {
                    component : FormCreaLineaComponent, 
                    constancia,
                    header : constancia.folio,
                    emisor_group: true,
                    receptor_group: true,
                    operacion_group: true,
                    save: true,
                    type_modal: TypeModalEnum.MODIFICACION_LINEA
                  }
                })
            }
          });
        }
      });
  }

  cleanSelection() {
    this.filterTable?.filterField.setValue('');
    if(this.selection.hasValue()) {
      this.selection.clear();
    }
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
    
    this._utilerias.exportData(formatoDescarga, header, 'Constancias fiscales', constanciasExport);
  }

  onValueChangeInput(response: boolean) {
    if(response) {
      this.selection.clear();
    }
  }

  exportarEditar() {
    this.disabledExportar = !this.disabledExportar;
    if(this.disabledExportar) {
      this.iconExportar = 'get_app';
      this.labelBtnExportar = Constantes.LABEL_BTN_HABILITAR_EXPORT;
      this.selection.clear();
    } else {
      this.iconExportar = 'create';
      this.labelBtnExportar = Constantes.LABEL_BTN_HABILITAR_EDIT;
    }
  }
}
