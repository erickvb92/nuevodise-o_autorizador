import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';
import { AppRoutingModule } from './../../../../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialModule } from "./../../../../material/material.module";
import { MessageModule } from './../../../../common/message/message.module';
import { DlgCancelarComponent } from './dlg-cancelar/dlg-cancelar.component';
import { DlgComentarioComponent } from './dlg-comentario/dlg-comentario.component';
import { DlgMessageComponent } from './dlg-message/dlg-message.component';
import { DlgPdfComponent } from './dlg-pdf/dlg-pdf.component';
import { DlgFormComponent } from './dlg-form/dlg-form.component';
import { DlgGenerarzipComponent } from './dlg-generarzip/dlg-generarzip.component';

@NgModule({
    declarations: [
        DlgCancelarComponent,
        DlgComentarioComponent,
        DlgMessageComponent,
        DlgPdfComponent,
        DlgFormComponent,
        DlgGenerarzipComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AngularSvgIconModule.forRoot(),
        AppRoutingModule,
        FontAwesomeModule,  
        ReactiveFormsModule,      
        MaterialModule,
        MessageModule,
        PortalModule 
    ]
})
export class DialogsModule {

}
