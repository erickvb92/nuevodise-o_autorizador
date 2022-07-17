import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { ParamConstanciasComponent } from './parametros/param-constancias/param-constancias.component';
import { ParamEquivalenciasComponent } from './parametros/param-equivalencias/param-equivalencias.component';
import { ParamFechasComponent } from './parametros/param-fechas/param-fechas.component';
import { ParamInterfaceComponent } from './parametros/param-interface/param-interface.component';
import { ParamPerfilamientoComponent } from './parametros/param-perfilamiento/param-perfilamiento.component';
import { ParamSemaforoComponent } from './parametros/param-semaforo/param-semaforo.component';
import { CatLogotiposComponent } from './catalogos/cat-logotipos/cat-logotipos.component';
import { CatClaconesComponent } from './catalogos/cat-clacones/cat-clacones.component';
import { CoacreditadosComponent } from './catalogos/coacreditados/coacreditados.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: AdministracionComponent, canActivate: [AuthGuard] },
  { path: 'catalogos', component: CatalogosComponent, canActivate: [AuthGuard] },
  { path: 'catalogos/logotipos', component: CatLogotiposComponent, canActivate: [AuthGuard] },
  { path: 'catalogos/clacones', component: CatClaconesComponent, canActivate: [AuthGuard] },
  { path: 'catalogos/coacreditados', component: CoacreditadosComponent, canActivate: [AuthGuard] },
  { path: 'parametros', component: ParametrosComponent, canActivate: [AuthGuard] },
  { path: 'paramConstancias', component: ParamConstanciasComponent, canActivate: [AuthGuard] },
  { path: 'paramEquivalencias', component: ParamEquivalenciasComponent, canActivate: [AuthGuard] },
  { path: 'paramFechas', component: ParamFechasComponent, canActivate: [AuthGuard] },
  { path: 'paramInterface', component: ParamInterfaceComponent, canActivate: [AuthGuard] },
  { path: 'paramPerfil', component: ParamPerfilamientoComponent, canActivate: [AuthGuard] },
  { path: 'paramSemaforo', component: ParamSemaforoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
