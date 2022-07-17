import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MttoMensualComponent } from './mtto-mensual/mtto-mensual.component';
import { MttoAnualComponent } from "./mtto-anual/mtto-anual.component";



@NgModule({
    declarations: [
        MttoMensualComponent,
        MttoAnualComponent
    ],
    exports: [
        MttoMensualComponent,
        MttoAnualComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        AngularSvgIconModule.forRoot(),
        MatTabsModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatToolbarModule

    ]
})
export class MantenimientoModule {

}