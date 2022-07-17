import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuModule } from './menu/menu.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { Utilerias } from "./common/utilerias";
import { InterceptorProviders } from './interceptor/interceptors';

// modules
import { PagesModule } from './pages/pages.module';
import { MessageModule } from './common/message/message.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    PagesModule,
    FontAwesomeModule,
    AngularSvgIconModule.forRoot(),
    MessageModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    Utilerias,
    InterceptorProviders,
    { provide: APP_BASE_HREF, useValue: '/autorizador/'},
    { provide: "API_URL_LOADFILE", useValue: environment.URL_MS_LOADFILE },
    { provide: "API_URL_DOWNLOADCF", useValue: environment.URL_MS_DOWNLOADCF },
    { provide: "API_URL_CATALOGOS", useValue: environment.URL_MS_CATALOGOS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
