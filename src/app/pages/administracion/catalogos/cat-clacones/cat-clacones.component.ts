import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Constantes } from '../../../../common/constantes';
import { Utilerias } from '../../../../common/utilerias';
import { DlgFormComponent } from '../../../shared/components/dialogs/dlg-form/dlg-form.component';
import { FormClaconComponent } from './../../../shared/components/forms/form-clacon/form-clacon.component';
import { AdminCatalogosService } from '../../services/admin-catalogos.service';
import { ClaconesService } from '../../services/clacones.service';
import { ClaconesModel } from './../../../../model/caclones.model';
import { ClaveClaconesModel } from './../../../../model/catalogos-caclones.model';
import { TypeModalEnum } from '../../../../enum/type-modal';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-cat-clacones',
  templateUrl: './cat-clacones.component.html',
  styleUrls: ['./cat-clacones.component.scss']
})
export class CatClaconesComponent implements OnInit {

  searchField = new FormControl('');
  statusField = new FormControl('');
  clavesClaconesList: ClaveClaconesModel[] = [];
  idClabeSelected: string | number = '';
  statusSelected: boolean = true;
  totalClacones: number;
  bitacoraDataSource: MatTableDataSource<ClaconesModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [
    'clave',
    'subclave',
    'codigo',
    'indicador_a',
    'indicador_b',
    'nombre',
    'origen',
    'complemento',
    'divisa',
    'descripcion',
    'detalle',
    'acciones'
  ];

  constructor(
    private catalogosService: AdminCatalogosService,
    private claconesService: ClaconesService,
    private utilerias: Utilerias,
    private cdref: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.getCatalogos();
    this.getDataClacones();
    this.getResultSelect();
    this.getStatusSelect();
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
    this.bitacoraDataSource.paginator = this.paginator;
    this.cdref.detectChanges();
  }

  getCatalogos(): void{
    this.catalogosService.getClabeTipoClacones().subscribe({
        next: response => this.clavesClaconesList = response,
        error: error => console.error(error)
    });
  }

  getResultSelect() {
    this.searchField.valueChanges.subscribe( response => {
      this.idClabeSelected = response;
      this.getDataClacones();
    })
  }

  getStatusSelect() {
    this.statusField.valueChanges.subscribe( response => {
      this.statusSelected = response;
      console.log(this.statusSelected);
      this.getDataClacones();
    })
  }

  getDataClacones() {
    this.claconesService.getCaclonesData(this.idClabeSelected, this.statusSelected).subscribe({
      next: response => {
        this.bitacoraDataSource = new MatTableDataSource<ClaconesModel>(response);
        this.bitacoraDataSource.paginator = this.paginator;
        this.totalClacones = response.length;
        console.log(response)
      },
      error: error => this.utilerias.showDialogError(error.error)
    })
  }

  addClacon() {
    const dialogRef  = this.utilerias.showDialogWithConfig(DlgFormComponent, {
      width: "40%", height: "unset",
      data: {
        component : FormClaconComponent,
        header : 'Agregar Clacon',
        type_modal: TypeModalEnum.AGREGAR_CLACON
      }
    });

    dialogRef.afterClosed().subscribe(
      response => {
        if(response) {
          this.utilerias.showDialogSuccess('Registro agregado con éxito');
          this.getDataClacones();
        }
      }
    )
  }

  updateClacon(dataClacon: ClaconesModel) {
    this.utilerias.showDialogWithConfig(DlgFormComponent, {
      width: "40%", height: "unset",
      data: {
        component: FormClaconComponent,
        header: 'Modificar Clacon',
        type_modal: TypeModalEnum.MODIFICAR_CLACON,
        dataClacon
      }
    }).afterClosed().subscribe(
      response => {
        if(response) {
          this.utilerias.showDialogSuccess('Registro actualizado con éxito');
          this.getDataClacones();
        }
      }
    )
  }

  deleteClacon(id: number) {
    const dialogRef = this.utilerias.showDialogConfirm('¿Estás seguro que deseas eliminar el registro?');
    dialogRef.afterClosed().subscribe( response =>  {
      if(response) {
        this.utilerias.showDialogConfirm('Al eliminar el registro ya no podrás acceder a él ¿estás seguro de esta acción?')
        .afterClosed().subscribe( result => {
          if(result) {
            this.claconesService.deleteClacon(id).subscribe({
              next: () => this.getDataClacones(),
              error: error => console.error(error.message)
            });
          }
        });
      }
    });
  }

  changedStatus(event: MatSlideToggleChange, idClacon: number) {
    let alertmsg = '';
    if(event.checked) {
      alertmsg = 'Estás seguro que deseas activar este registro?';
    } else {
      alertmsg = 'Estás seguro que deseas desactivar este registro?';
    }

    this.utilerias.showDialogConfirm(alertmsg)
      .afterClosed().subscribe( result => {
        if(result) {
          this.claconesService.changeStatusClacon(idClacon, event.checked).subscribe({
            next: () => this.getDataClacones(),
            error: error => console.error(error.message)
          });
        }
      });
  }

  exportar(formatoDescarga: string) {
    const header = ["Clave", "Sub-clave", "Código", "Indicador_A",
      "Indicador_B", "Nombre", "Origen", "Complemento", "Divisa", "Descripción"];
    
    let nameSheet = 'Todas las claves';
    this.clavesClaconesList.forEach((cveCat) => {
      if(cveCat.id === this.searchField.value) {
        if(cveCat.descripcion !== undefined) {
          nameSheet = String(cveCat.descripcion);
        }
      }
    });

    let clavesExport = new Array();
    this.bitacoraDataSource.data.forEach((claveItem) => {
      clavesExport.push([claveItem.clave?.nombreClave, claveItem.subclave?.nombreSub, claveItem.codigo,
        claveItem.indicadorA, claveItem.indicadorB, claveItem.nombre?.nombre, claveItem.origen?.nombreOrigen,
        claveItem.complemento, claveItem.divisa?.nombreDivisa, claveItem.descripcion ]);
    });

    this.utilerias.exportData(formatoDescarga, header, nameSheet, clavesExport);
  }
}
