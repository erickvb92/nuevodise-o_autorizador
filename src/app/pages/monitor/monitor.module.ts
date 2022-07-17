import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialModule } from "src/app/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MonitorMensualComponent } from './monitor-mensual/monitor-mensual.component';
import { MonitorAnualComponent } from './monitor-anual/monitor-anual.component';
import { MonitorFlujoComponent } from './monitor-flujo/monitor-flujo.component';

@NgModule({
    declarations: [
        MonitorMensualComponent,
        MonitorAnualComponent,
        MonitorFlujoComponent        
    ],
    exports: [],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        AngularSvgIconModule.forRoot(),
        ReactiveFormsModule
    ]
})
export class MonitorModule {

}
