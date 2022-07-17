import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { principalComponent } from './principal.component';
import { DspExtraccionComponent } from './dsp-extraccion/dsp-extraccion.component';
import { DspCancelacionComponent } from './dsp-cancelacion/dsp-cancelacion.component';
import { DspModificacionComponent } from './dsp-modificacion/dsp-modificacion.component';
import { DspBloqueoComponent } from './dsp-bloqueo/dsp-bloqueo.component';
import { DspCreacionComponent } from './dsp-creacion/dsp-creacion.component';
import { CanLineaComponent } from './dsp-cancelacion/can-linea/can-linea.component';
import { CanMasivaComponent } from './dsp-cancelacion/can-masiva/can-masiva.component';
import { CreaLineaComponent } from './dsp-creacion/crea-linea/crea-linea.component';
import { CreaMasivaComponent } from './dsp-creacion/crea-masiva/crea-masiva.component';
import { MaterialModule } from "../../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { MessageModule } from '../../common/message/message.module';

@NgModule({
    declarations: [
        DspExtraccionComponent,
        DspCancelacionComponent,
        DspBloqueoComponent,
        DspCreacionComponent,
        CanLineaComponent,
        CanMasivaComponent,
        CreaLineaComponent,
        CreaMasivaComponent,
        principalComponent,
        DspModificacionComponent     
    ],
    providers:[DatePipe],
    exports: [],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        AngularSvgIconModule.forRoot(),
        MaterialModule, 
        SharedModule,
        MessageModule
    ]
})
export class principalModule {

}
