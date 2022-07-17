import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialModule } from "src/app/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

import { SatCatalogosComponent } from './sat-catalogos/sat-catalogos.component';
import { SatParametrosComponent } from './sat-parametros/sat-parametros.component';
import { SatCargaRegistrosComponent } from './sat-carga-registros/sat-carga-registros.component';
import { SatConsultaRegistosComponent } from './sat-consulta-registos/sat-consulta-registos.component';
import { SatProgramacionComponent } from './sat-programacion/sat-programacion.component';

@NgModule({
    declarations: [
        SatCatalogosComponent,
        SatParametrosComponent,
        SatCargaRegistrosComponent,
        SatConsultaRegistosComponent,
        SatProgramacionComponent
    ],
    exports: [ ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        AngularSvgIconModule.forRoot(),
        ReactiveFormsModule],
})
export class SatModule {

}