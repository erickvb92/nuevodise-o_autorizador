import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "../../material/material.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBusquedaConstanciasComponent } from './components/forms/form-busqueda-constancias/form-busqueda-constancias.component';
import { FormCargaArchivoComponent } from './components/forms/form-carga-archivo/form-carga-archivo.component';
import { FormCreaLineaComponent } from './components/forms/form-crea-linea/form-crea-linea.component';
import { FormDatosEmisorComponent } from './components/forms/form-datos-emisor/form-datos-emisor.component';
import { FormDatosReceptorComponent } from './components/forms/form-datos-receptor/form-datos-receptor.component';
import { FormDatosOperacionComponent } from './components/forms/form-datos-operacion/form-datos-operacion.component';
import { FormFiltroTablaComponent } from './components/forms/form-filtro-tabla/form-filtro-tabla.component';
import { MessageModule } from "src/app/common/message/message.module";
import { DialogsModule } from './components/dialogs/dialogs.module';
import { ProcessCartComponent } from './components/process-cart/process-cart.component';
import { ContentCartComponent } from './components/content-cart/content-cart.component';
import { FormClaconComponent } from './components/forms/form-clacon/form-clacon.component';
import { FormCoacreditadoComponent } from './components/forms/form-coacreditado/form-coacreditado.component';
@NgModule({
  declarations: [
    FormBusquedaConstanciasComponent,
    FormCargaArchivoComponent,
    FormCreaLineaComponent,
    FormDatosEmisorComponent,
    FormDatosReceptorComponent,
    FormDatosOperacionComponent,
    FormFiltroTablaComponent,
    ProcessCartComponent,
    ContentCartComponent,
    FormClaconComponent,
    FormCoacreditadoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MessageModule,
    DialogsModule
  ],
  exports: [
    FormBusquedaConstanciasComponent,
    FormCargaArchivoComponent,
    FormCreaLineaComponent,
    FormFiltroTablaComponent,
    ProcessCartComponent,
    FormCoacreditadoComponent
  ]
})
export class SharedModule { }
