import { Route } from '@angular/router';
import { Error404Component } from './error-404/error404.component';


export const error404Routes: Route[] = [
    {   path: '404', component: Error404Component  }, 
    {   path: '**', redirectTo: '404'}
];
