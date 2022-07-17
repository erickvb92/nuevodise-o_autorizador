import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { Error404Component } from './error-404/error404.component';
import { error404Routes } from './error-routing.module';


@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule, 
    AngularSvgIconModule.forRoot(),
    RouterModule.forChild(error404Routes)
  ]
})
export class ErrorModule { }
