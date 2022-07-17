import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdministracionRoutingModule } from './administracion-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from "src/app/material/material.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CatalogosComponent } from './catalogos/catalogos.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { ParamConstanciasComponent } from './parametros/param-constancias/param-constancias.component';
import { ParamEquivalenciasComponent } from './parametros/param-equivalencias/param-equivalencias.component';
import { ParamFechasComponent } from './parametros/param-fechas/param-fechas.component';
import { ParamInterfaceComponent } from './parametros/param-interface/param-interface.component';
import { ParamPerfilamientoComponent } from './parametros/param-perfilamiento/param-perfilamiento.component';
import { ParamSemaforoComponent } from './parametros/param-semaforo/param-semaforo.component';
import { CatLogotiposComponent } from './catalogos/cat-logotipos/cat-logotipos.component';
import { MessageModule } from "src/app/common/message/message.module";
import { CatClaconesComponent } from './catalogos/cat-clacones/cat-clacones.component';
import { CoacreditadosComponent } from './catalogos/coacreditados/coacreditados.component';
import { EditarPorcentajesComponent } from './catalogos/coacreditados/editar-porcentajes/editar-porcentajes.component';
import { FiltrosComponent } from './catalogos/coacreditados/filtros/filtros.component';

@NgModule({
    declarations: [
        CatalogosComponent,
        ParametrosComponent,
        ParamConstanciasComponent,
        ParamEquivalenciasComponent,
        ParamFechasComponent,
        ParamInterfaceComponent,
        ParamPerfilamientoComponent,
        ParamSemaforoComponent,
        CatLogotiposComponent,
        CatClaconesComponent,
        CoacreditadosComponent,
        EditarPorcentajesComponent,
        FiltrosComponent
    ],
    exports: [
        CatalogosComponent,
        ParametrosComponent,
        ParamConstanciasComponent,
        ParamEquivalenciasComponent,
        ParamFechasComponent,
        ParamInterfaceComponent,
        ParamPerfilamientoComponent,
        ParamSemaforoComponent
    ],
    imports: [
        CommonModule,
        AdministracionRoutingModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        AngularSvgIconModule.forRoot(),
        MatTabsModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatToolbarModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MessageModule
    ]
})
export class AdministracionModule {

}
