import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AdministracionComponent } from './administracion/administracion.component';
import { MonitorComponent } from './monitor/monitor.component';
import { DatosComponent } from './datos/datos.component';
import { SatComponent } from './sat/sat.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { MonitorModule } from "./monitor/monitor.module";
import { DialogsModule } from "./shared/components/dialogs/dialogs.module";
import { principalModule } from "./principal/principal.module";
import { MessageModule } from "../common/message/message.module";

@NgModule({
    declarations: [
        AdministracionComponent,
        DatosComponent,
        MonitorComponent,
        SatComponent,
        TratamientoComponent,
        MantenimientoComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        principalModule,
        MonitorModule,
        DialogsModule, 
        MessageModule
    ]
})
export class PagesModule { }
