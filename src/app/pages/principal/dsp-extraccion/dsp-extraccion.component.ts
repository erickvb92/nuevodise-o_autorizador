import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Utilerias } from '../../../common/utilerias';
import { Constantes } from '../../../common/constantes';
import { appConstantsMessages } from '../../../common/const.messages';
import { DlgPdfComponent } from '../../shared/components/dialogs/dlg-pdf/dlg-pdf.component';
import { DlgGenerarzipComponent } from '../../shared/components/dialogs/dlg-generarzip/dlg-generarzip.component';
import { FormBusquedaConstanciasComponent } from '../../shared/components/forms/form-busqueda-constancias/form-busqueda-constancias.component';
import { FormFiltroTablaComponent } from '../../shared/components/forms/form-filtro-tabla/form-filtro-tabla.component';
import { TipoConstancia } from '../../../model/tipo-constancia.model';
import { EjercicioFiscal } from '../../../model/ejercicio-fiscal.model';
import { Institucion } from '../../../model/institucion.model';
import { Constancia } from '../../../model/constancia.model';
import { Sello } from '../../../model/sello.model';
import { DocumentoPdf } from '../../../model/documento-pdf.model';
import { ConstanciaRequestCfdi } from '../../../model/constancia-request-cfdi.model';
import { ExtraccionService } from '../services/extraccion.service';
import * as fileSaver from 'file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-dsp-extraccion',
  templateUrl: './dsp-extraccion.component.html',
  styleUrls: ['./dsp-extraccion.component.css']
})
export class DspExtraccionComponent implements OnInit {

  tipoConsulta = Constantes.TIPO_CONSULTA_EXTRACCION;
  tiposConstanciaList: TipoConstancia[];
  ejerciciosFiscalesList: EjercicioFiscal[];
  institucionesList: Institucion[];
  displayedColumns: string[];
  selection: SelectionModel<Constancia>;
  sellosDetalle: Sello[];

  @ViewChild(MatPaginator, {read: MatPaginator, static: false}) 
  paginator: MatPaginator;

  @ViewChild('formBusqueda', {read: FormBusquedaConstanciasComponent, static: false})
  private formBusqueda: FormBusquedaConstanciasComponent;

  @ViewChild('filterTable', {read: FormFiltroTablaComponent, static: false})
  private filterTable: FormFiltroTablaComponent;

  algo: string;

  constructor(
    private cdref: ChangeDetectorRef,
    private utilerias: Utilerias,
    private service: ExtraccionService) { 
      this.tiposConstanciaList = new Array();
      this.ejerciciosFiscalesList = new Array();
      this.institucionesList = new Array();
      this.displayedColumns = ['id', 'tipo', 'institucion', 'ejercicioFiscal', 'rfc', 'nombre', 'cod_cliente', 'cuenta', 'participacion_cliente', 'folio', 'estatus', 'pdf', 'xml', 'detalle'];
      this.selection = new SelectionModel<Constancia>(true, []);
      this.sellosDetalle = new Array();
  }

  ngOnInit(): void { }

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

  visualizarPDF(constanciaSelected: Constancia) {
    let requestCfdi: ConstanciaRequestCfdi = this.getRequestCfdi(constanciaSelected);
    this.service.getDocumentosPdf(requestCfdi)
      .subscribe({
        next: responsePdf => {
          let pdfs: DocumentoPdf[] = new Array();
          pdfs.push({ nombreArchivo: this.utilerias.getNameDownloadPdf(constanciaSelected, false), 
              nombreDocumento: 'Constancia oficial', contenido: responsePdf.dataResult.document });
          if(responsePdf.dataResult.detail !== null && responsePdf.dataResult.detail !== '') {
            pdfs.push({ nombreArchivo: this.utilerias.getNameDownloadPdf(constanciaSelected, true), 
              nombreDocumento: 'Constancia Detalle / Informativa', contenido: responsePdf.dataResult.detail });
          }
          this.utilerias.showDialog(DlgPdfComponent, '800px', '500px', pdfs);
        },
        error: error => {
          this.utilerias.showDialogError(error);
        }
    });
  }

  descargarXML(constanciaSelected: Constancia) {
    let requestCfdi: ConstanciaRequestCfdi = this.getRequestCfdi(constanciaSelected);
    this.service.getSellosXml(requestCfdi)
      .subscribe({
        next: response => {       
          //if(sellos.length === 1) {
          //  let sello: Sello = sellos[0];
          //  let blobXml = this.utilerias.getContentToBlobXml(sello.xml);
          //  fileSaver.saveAs(blobXml, sello.nombre);
          //} else {
          //  const zip = new JSZip();
          //  sellos.forEach((sello) =>{
          //    let blobXml = this.utilerias.getContentToBlobXml(sello.xml);
          //    zip.file(sello.nombre, blobXml);
          //  });
          //  zip.generateAsync({type:"blob"}).then(function(content) {
          //      fileSaver.saveAs(content, "example.zip");
          //  });
          //}
          let blobXml = this.utilerias.getBase64ToBlob(response.dataResult.document, Constantes.CONTENT_TYPE_XML);
          fileSaver.saveAs(blobXml, response.dataResult.documentName);
        },
        error: error => {
          this.utilerias.showDialogError(error);
        }
    });
  }

  descargarSello(sello: Sello) {
    let blobXml = this.utilerias.getBase64ToBlob(sello.xml, Constantes.CONTENT_TYPE_XML);
    fileSaver.saveAs(blobXml, sello.nombre);
  }

  verDetalle(constanciaSelected: Constancia) {
    let botonesDettale = Array.from(document.getElementsByClassName("btnDetalle"));
    if(botonesDettale != null) {
      botonesDettale.forEach((btnPlus) =>{
        let icons = Array.from((<HTMLButtonElement>btnPlus).getElementsByTagName('mat-icon'));
        let iconPlus = icons[0];
        if(btnPlus.id == `plus${constanciaSelected.id}`) {
          if(iconPlus.innerHTML === 'add_circle_outline') {
            let requestCfdi: ConstanciaRequestCfdi = this.getRequestCfdi(constanciaSelected);
            this.service.getSellosXml(requestCfdi)
              .subscribe({
                next: response => {       
                    this.sellosDetalle = [{ nombre: response.dataResult.documentName, xml: response.dataResult.document, estatus: 'A' }];
                    iconPlus.innerHTML = 'remove_circle_outline';
                    let divsSellos = Array.from(document.getElementsByClassName("divSellos"));
                    if(divsSellos != null) {
                      divsSellos.forEach((tempDiv) =>{
                        let divSellos = <HTMLElement>tempDiv;
                        if(divSellos.id == `detalle${constanciaSelected.id}`) {
                          divSellos.classList.remove('d-none');
                          // divSellos.style.display = 'inline';
                        } else {
                          divSellos.classList.add('d-none');
                          // divSellos.style.display = 'none';
                        }
                      });
                    }
                  },
                  error: error => {
                    this.utilerias.showDialogError(error);
                  }
              });
          } else {
            iconPlus.innerHTML = 'add_circle_outline';
            this.sellosDetalle = new Array();
          }
        } else {
          iconPlus.innerHTML = 'add_circle_outline';
        }
      });
    }
  }

  cleanSelection() {
    this.filterTable?.filterField.setValue('');
    if(this.selection.hasValue()) {
      this.selection.clear();
    }
  }

  getRequestCfdi(constanciaSelected: Constancia): ConstanciaRequestCfdi {
    let constanciaCfdi: ConstanciaRequestCfdi = new ConstanciaRequestCfdi();
    constanciaCfdi.uuId = "1";
    constanciaCfdi.tipoConst = constanciaSelected.cveTipo;
    //constanciaCfdi.ejercFis = constanciaSelected.ejercicioFiscal;
    constanciaCfdi.ejercFis = 4366;
    constanciaCfdi.codigoCta = constanciaSelected.cuenta;
    //constanciaCfdi.folio = constanciaSelected.folio;
    constanciaCfdi.folio = "AR-000000007";
    constanciaCfdi.canal = "5";
    return constanciaCfdi;
  }

  generarZIP() {
    if(this.selection.selected == null || 
      (this.selection.selected != null && this.selection.selected.length === 0)) {
        this.utilerias.showDialogError(appConstantsMessages['table.selected.zero']);
        return;
    }

    let cfdiConstancias: ConstanciaRequestCfdi[] = new Array();
    this.selection.selected.forEach(selectedConst => {
      cfdiConstancias.push(this.getRequestCfdi(selectedConst));
    });

    let dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.data = cfdiConstancias;
    dialogConfig.autoFocus = false;
    dialogConfig.role = 'alertdialog';
    this.utilerias.showDialogWithConfig(DlgGenerarzipComponent, dialogConfig);
  }

  onValueChangeInput(response: boolean) {
    if(response) {
      this.selection.clear();
    }
  }
}
