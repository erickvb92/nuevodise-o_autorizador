import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Constantes } from '../../../../../common/constantes';
import { Estatus } from '../../../../../common/estatus';
import { EjercicioFiscal } from '../../../../../model/ejercicio-fiscal.model';
import { Institucion } from '../../../../../model/institucion.model';
import { TipoConstancia } from '../../../../../model/tipo-constancia.model';
import { Constancia } from '../../../../../model/constancia.model';
import { SessionService } from '../../../../../service/seguridad/session.service';
import { ParametriaService } from '../../../../principal/services/parametria.service';
import { CatalogosService } from '../../../services/catalogos.service';
import { ExtraccionService } from '../../../../principal/services/extraccion.service';
import { ModificacionService } from '../../../../principal/services/modificacion.service';
import { CancelacionService } from '../../../../principal/services/cancelacion.service';
import { BloqueoService } from '../../../../principal/services/bloqueo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form-busqueda-constancias',
  templateUrl: './form-busqueda-constancias.component.html',
  styleUrls: ['./form-busqueda-constancias.component.css']
})
export class FormBusquedaConstanciasComponent implements OnInit {

  @Input() tipoConsulta: string;
  @Input() paginator: MatPaginator;
  busquedaForm: FormGroup;
  tiposConstanciaList: TipoConstancia[];
  ejerciciosFiscalesList: EjercicioFiscal[];
  institucionesList: Institucion[];
  constanciasList: MatTableDataSource<Constancia>;
  isShowInputNumProveedor = false;

  @Output()
  cleanSelection = new EventEmitter();
 
  constructor(
    private _fb: FormBuilder,
    private _serviceSession: SessionService,
    private _serviceParametria: ParametriaService,
    private _serviceCatalogos: CatalogosService,
    private _serviceExtraccion: ExtraccionService,
    private _serviceModificacion: ModificacionService,
    private _serviceCancelacion: CancelacionService,
    private _serviceBloqueo: BloqueoService) {
      let session = this._serviceSession.currentUserValue;
      if(session != null && session.tipoUsuario == Constantes.TIPO_USUARIO_GESBAN) {
        this.isShowInputNumProveedor = true;
      }
      this.busquedaForm = this._fb.group({
        ejercicioFiscal: ['', Validators.required],
        tipoConstancia: ['', Validators.required],
        numeroCuenta: [''],
        codigoCliente: [''],
        numeroProveedor: [''],
        rfcCliente: [''],
        folioInterno: [''],
        institucion: ['']
      });
      this.constanciasList = new MatTableDataSource<Constancia>(); 
  }

  ngOnInit(): void {    
    this.fillCatalogos();
  }

  campoNoValido(campo: string){
    return this.busquedaForm.get(campo)?.invalid && this.busquedaForm.get(campo)?.touched;
  }

  consultarCF() {
    this.cleanConsulta();
    
    if(this.busquedaForm.invalid) {
      this.busquedaForm.markAllAsTouched();
      return;
    }

    if(this.tipoConsulta === Constantes.TIPO_CONSULTA_EXTRACCION) {
      this.consultaConstanciasExtraccion();
    } else if(this.tipoConsulta === Constantes.TIPO_CONSULTA_MODIFICACION) {
      this.consultaConstanciasModificacion();
    } else if(this.tipoConsulta === Constantes.TIPO_CONSULTA_CANCELACION) {
      this.consultaConstanciasCancelacion();
    } else if(this.tipoConsulta === Constantes.TIPO_CONSULTA_BLOQUEO) {
      this.consultaConstanciasBloquedoDesbloqueo();
    }

    let tipoConstancia = '';
    this.tiposConstanciaList.forEach((tipoConst) => {
      if(tipoConst.id === this.busquedaForm.get('tipoConstancia')?.value) {
        tipoConstancia = tipoConst.tipo;
      }
    });
    this.constanciasList.data.forEach((constancia) => {
      constancia.tipo = tipoConstancia;
      constancia.ejercicioFiscal = this.busquedaForm.get('ejercicioFiscal')?.value;
    });
  }

  fillCatalogos(): void {
    this._serviceCatalogos.getTiposConstancia()
      .subscribe({
        next: response => {
          this.tiposConstanciaList = response;
        },
        error: error => {
          console.log(error);
        }
    });
    this._serviceParametria.getParametro('fhejerciciofiscal')
      .subscribe({
        next: parametro => {
          this._serviceCatalogos.getEjerciciosFiscales()
            .subscribe({
              next: respEjerciciosFiscales => {
                let fechaActual = new Date();
                var fechaParametro = moment(parametro.valor, "DD/MM/YYYY").toDate();
                let anioMinimoPermitido = fechaActual.getUTCFullYear();
                if(fechaActual.getTime() > fechaParametro.getTime()) {
                  anioMinimoPermitido = anioMinimoPermitido - 1;
                } else {
                  anioMinimoPermitido = anioMinimoPermitido - 2;
                }
                let eFiscalesPermitidos: EjercicioFiscal[] = new Array();
                respEjerciciosFiscales.forEach((eFiscal) => {
                  if(Number(eFiscal.ejercicio) >= anioMinimoPermitido) {
                    eFiscalesPermitidos.push(eFiscal);
                  }
                });
                this.ejerciciosFiscalesList = eFiscalesPermitidos;          
              },
              error: error => {
                console.log(error);
              }
          });         
        },
        error: error => {
          console.log(error);
        }
    });
    this._serviceCatalogos.getInstituciones()
      .subscribe({
        next: response => {
          this.institucionesList = response;          
        },
        error: error => {
          console.log(error);
        }
    });
  }

  consultaConstanciasExtraccion() {
    this._serviceExtraccion.consultaCF()
      .subscribe({
        next: response => {
          if(response != null && response.length > 0) {
            response.forEach((constExtracc) => {
              if(constExtracc.estatus === Estatus.BLOQUEADO.descEstatus) {
                constExtracc.disabled = true;
              } else {
                constExtracc.disabled = false;
              }
            });
          }
          this.constanciasList = new MatTableDataSource<Constancia>(response); 
          this.constanciasList.paginator = this.paginator;
        },
        error: error => {
          console.log(error);
        }
    });
  }

  consultaConstanciasModificacion() {
    this._serviceModificacion.consultaCF()
      .subscribe({
        next : response => {
          if(response != null && response.length > 0) {
            response.forEach((constMod) => {
              if(constMod.estatus === Estatus.BLOQUEADO.descEstatus
                || constMod.estatus === Estatus.FLUJO_ACLARACION.descEstatus
                || constMod.estatus === Estatus.CANCELADO.descEstatus) {
                constMod.disabled = true;
              } else {
                constMod.disabled = false;
              }
            });
          }
          this.constanciasList = new MatTableDataSource<Constancia>(response); 
          this.constanciasList.paginator = this.paginator;
        },
        error: error => {
          console.log(error);
        }
    });
  }

  consultaConstanciasCancelacion() {
    this._serviceCancelacion.consultaCF()
      .subscribe({
        next: response => {
          if(response != null && response.length > 0) {
            response.forEach((constCanc) => {
              if(constCanc.estatus === Estatus.BLOQUEADO.descEstatus
                || constCanc.estatus === Estatus.FLUJO_ACLARACION.descEstatus
                || constCanc.estatus === Estatus.CANCELADO.descEstatus) {
                constCanc.disabled = true;
              } else {
                constCanc.disabled = false;
              }
            });
          }
          this.constanciasList = new MatTableDataSource<Constancia>(response); 
          this.constanciasList.paginator = this.paginator;
        },
        error: error => {
          console.log(error);
        }
    });
  }

  consultaConstanciasBloquedoDesbloqueo() {
    this._serviceBloqueo.consultaCF()
      .subscribe({
        next: response => {
          if(response != null && response.length > 0) {
            response.forEach((constBloq) => {
              if(constBloq.estatus === Estatus.BLOQUEADO.descEstatus) {
                constBloq.bloqueo = true;
              } else {
                constBloq.bloqueo = false;
              }
            });
          }
          this.constanciasList = new MatTableDataSource<Constancia>(response); 
          this.constanciasList.paginator = this.paginator;
        },
        error: error => {
          console.log(error);
        }
    });
  }

  resetPaginator() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
  }

  cleanConsulta() {
    this.resetPaginator();
    this.cleanSelection.emit();
  }

  limpiarConsulta() {
    this.busquedaForm.reset();
    this.constanciasList = new MatTableDataSource<Constancia>();
    this.resetPaginator();
    this.constanciasList.paginator = this.paginator;
    this.cleanSelection.emit();
  }
}
