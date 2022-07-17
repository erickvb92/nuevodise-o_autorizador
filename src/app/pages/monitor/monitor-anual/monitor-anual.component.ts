import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EjercicioFiscal } from 'src/app/model/ejercicio-fiscal.model';
import { TipoConstancia } from './../../../model/tipo-constancia.model';
import { CatalogosService } from '../../shared/services/catalogos.service';

const DATA_DUMMY = [
  {
    id: 1,
    tipo_constancia: 'Arrendamiento',
    fecha_carga: '10/08/2015',
    registros_totales: '',
    registros_ok: '',
    registros_inconsistentes: '',
    vobo: false,
    sellado_timbrado: false,
    vobo_principal: false,
    visualizacion: true
  },
  {
    id: 2,
    tipo_constancia: 'Autotransporte',
    fecha_carga: '10/08/2015',
    registros_totales: '',
    registros_ok: '',
    registros_inconsistentes: '',
    vobo: false,
    sellado_timbrado: false,
    vobo_principal: false,
    visualizacion: true
  }
]

@Component({
  selector: 'app-monitor-anual',
  templateUrl: './monitor-anual.component.html',
  styleUrls: ['./monitor-anual.component.css']
})
export class MonitorAnualComponent implements OnInit {

  procesamientoForm: FormGroup;
  tipoConstanciaList: TipoConstancia[];
  ejerciciosFiscalesList: EjercicioFiscal[];
  constanciasDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [
    'tipo', 
    'fecha_carga',
    'registros_totales', 
    'registros_ok',
    'registros_inconsistentes', 
    'vobo', 
    'sellado_timbrado',
    'vobo_principal',
    'visualizacion'
  ];

  constructor(
    private fb: FormBuilder,
    private catalogosService: CatalogosService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fillCatalogos();
  }

  initForm() {
    this.procesamientoForm = this.fb.group({
      periodo: ['', [Validators.required]],
      tipoConstancia: ['', [Validators.required]],
      ejercicioFiscal: ['', [Validators.required]]
    });
    this.constanciasDataSource = new MatTableDataSource<any>(); 
  }

  fillCatalogos(): void {
    forkJoin([
      this.catalogosService.getTiposConstancia(),
      this.catalogosService.getEjerciciosFiscales()
    ]).subscribe({
      next: ([response1, response2]) => {
        this.tipoConstanciaList = response1;
        this.ejerciciosFiscalesList = response2;
      },
      error: error => console.error(error)
    }
    );
  }

  campoNoValido(campo: string) {
    return this.procesamientoForm.get(campo)?.invalid && this.procesamientoForm.get(campo)?.touched;
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
  }
  
  consultarProcesamiento() {
    if(this.procesamientoForm.invalid) {
      this.procesamientoForm.markAllAsTouched();
    } else {
      this.constanciasDataSource = new MatTableDataSource<any>(DATA_DUMMY); 
      this.constanciasDataSource.paginator = this.paginator;
    }
  }
}
