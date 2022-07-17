import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { principalComponent } from './pages/principal/principal.component';
import { DspExtraccionComponent } from './pages/principal/dsp-extraccion/dsp-extraccion.component';
import { DspCancelacionComponent } from './pages/principal/dsp-cancelacion/dsp-cancelacion.component';
import { CanLineaComponent } from './pages/principal/dsp-cancelacion/can-linea/can-linea.component';
import { CanMasivaComponent } from './pages/principal/dsp-cancelacion/can-masiva/can-masiva.component';
import { DspCreacionComponent } from './pages/principal/dsp-creacion/dsp-creacion.component';
import { CreaLineaComponent } from './pages/principal/dsp-creacion/crea-linea/crea-linea.component';
import { CreaMasivaComponent } from './pages/principal/dsp-creacion/crea-masiva/crea-masiva.component';
import { DspBloqueoComponent } from './pages/principal/dsp-bloqueo/dsp-bloqueo.component';
import { DatosComponent } from './pages/datos/datos.component';
import { DatConsultaComponent } from './pages/datos/dat-consulta/dat-consulta.component';
import { DatAnaliticaComponent } from './pages/datos/dat-analitica/dat-analitica.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { MonitorMensualComponent } from './pages/monitor/monitor-mensual/monitor-mensual.component';
import { MonitorAnualComponent } from './pages/monitor/monitor-anual/monitor-anual.component';
import { MonitorFlujoComponent } from './pages/monitor/monitor-flujo/monitor-flujo.component';
import { SatComponent } from './pages/sat/sat.component';
import { SatParametrosComponent } from './pages/sat/sat-parametros/sat-parametros.component';
import { SatCargaRegistrosComponent } from './pages/sat/sat-carga-registros/sat-carga-registros.component';
import { SatConsultaRegistosComponent } from './pages/sat/sat-consulta-registos/sat-consulta-registos.component';
import { SatProgramacionComponent } from './pages/sat/sat-programacion/sat-programacion.component';
import { SatCatalogosComponent } from './pages/sat/sat-catalogos/sat-catalogos.component';
import { TratamientoComponent } from './pages/tratamiento/tratamiento.component';
import { TtoCargaComponent } from './pages/tratamiento/tto-carga/tto-carga.component';
import { TtoDescargaComponent } from './pages/tratamiento/tto-descarga/tto-descarga.component';
import { MantenimientoComponent } from './pages/mantenimiento/mantenimiento.component';
import { MttoMensualComponent } from './pages/mantenimiento/mtto-mensual/mtto-mensual.component';
import { MttoAnualComponent } from './pages/mantenimiento/mtto-anual/mtto-anual.component';
import { AuthGuard } from './guards/auth.guard';
import { DspModificacionComponent } from './pages/principal/dsp-modificacion/dsp-modificacion.component';

const appRoutes: Routes = [
  { path: 'principal', component: principalComponent, canActivate: [AuthGuard] },
  { path: 'extraccionPDF', component: DspExtraccionComponent, canActivate: [AuthGuard] },
  { path: 'cancelacion', component: DspCancelacionComponent, canActivate: [AuthGuard] },
  { path: 'cancelaLinea', component: CanLineaComponent, canActivate: [AuthGuard] },
  { path: 'cancelaMasiva', component: CanMasivaComponent, canActivate: [AuthGuard] },
  { path: 'creacion', component: DspCreacionComponent, canActivate: [AuthGuard] },
  { path: 'creaLinea', component: CreaLineaComponent, canActivate: [AuthGuard] },
  { path: 'creaMasiva', component: CreaMasivaComponent, canActivate: [AuthGuard] },
  { path: 'bloqueo', component: DspBloqueoComponent, canActivate: [AuthGuard] },
  { path: 'modificacion', component: DspModificacionComponent, canActivate: [AuthGuard] },
  {
    path: 'administracion',
    loadChildren: () => import('./pages/administracion/administracion.module').then(m => m.AdministracionModule),
    canActivate: [AuthGuard]
  },
  { path: 'datos', component: DatosComponent, canActivate: [AuthGuard] },
  { path: 'datConsulta', component: DatConsultaComponent, canActivate: [AuthGuard] },
  { path: 'datAnalitica', component: DatAnaliticaComponent, canActivate: [AuthGuard] },

  { path: 'monitor', component: MonitorComponent, canActivate: [AuthGuard] },
  { path: 'monitorMensual', component: MonitorMensualComponent, canActivate: [AuthGuard] },
  { path: 'monitorAnual', component: MonitorAnualComponent, canActivate: [AuthGuard] },
  { path: 'monitorFlujo', component: MonitorFlujoComponent, canActivate: [AuthGuard] },

  { path: 'sat', component: SatComponent, canActivate: [AuthGuard] },
  { path: 'satCatalogos', component: SatCatalogosComponent, canActivate: [AuthGuard] },
  { path: 'satParam', component: SatParametrosComponent, canActivate: [AuthGuard] },
  { path: 'satCargaRegistro', component: SatCargaRegistrosComponent, canActivate: [AuthGuard] },
  { path: 'satConsultaRegistro', component: SatConsultaRegistosComponent, canActivate: [AuthGuard] },
  { path: 'satProgramacion', component: SatProgramacionComponent, canActivate: [AuthGuard] },

  { path: 'tto', component: TratamientoComponent, canActivate: [AuthGuard] },
  { path: 'ttoCarga', component: TtoCargaComponent, canActivate: [AuthGuard] },
  { path: 'ttoDescarga', component: TtoDescargaComponent, canActivate: [AuthGuard] },

  { path: 'mtto', component: MantenimientoComponent, canActivate: [AuthGuard] },
  { path: 'mttoMensual', component: MttoMensualComponent, canActivate: [AuthGuard] },
  { path: 'mttoAnual', component: MttoAnualComponent, canActivate: [AuthGuard] },
  { 
    path: 'error', 
    loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)
  },
  { path: '**', redirectTo : 'error'}
];




@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
