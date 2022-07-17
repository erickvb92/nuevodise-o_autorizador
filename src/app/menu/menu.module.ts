import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MenuComponent } from './menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from "../pages/shared/shared.module";
import { SubmenuComponent } from './submenu/submenu.component';
import { MenuDspComponent } from './submenu/menu-dsp/menu-dsp.component';
import { MenuAdmComponent } from './submenu/menu-adm/menu-adm.component';
import { MatInputModule } from '@angular/material/input';
import { MenuDatComponent } from './submenu/menu-dat/menu-dat.component';
import { MenuMonitorComponent } from './submenu/menu-monitor/menu-monitor.component';
import { MenuSatComponent } from './submenu/menu-sat/menu-sat.component';
import { MenuTratamientoComponent } from './submenu/menu-tratamiento/menu-tratamiento.component';
import { MenuMantenimientoComponent } from './submenu/menu-mantenimiento/menu-mantenimiento.component';
 
@NgModule({
    declarations:[
        MenuComponent,
        SubmenuComponent,
        MenuDspComponent,
        MenuAdmComponent,
        MenuDatComponent,
        MenuMonitorComponent,
        MenuSatComponent,
        MenuTratamientoComponent,
        MenuMantenimientoComponent
    ],
    exports:[
        MenuComponent
    ],
    imports:[
        CommonModule,

        AppRoutingModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatCardModule,
        AngularSvgIconModule.forRoot(),
        MatSlideToggleModule,
        MatTabsModule,
        MatInputModule,
        SharedModule
    ]
})
export class MenuModule{

}
