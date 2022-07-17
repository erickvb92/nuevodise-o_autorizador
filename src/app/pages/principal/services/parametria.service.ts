import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Parametro } from '../../../model/parametro.model';

@Injectable({
  providedIn: 'root'
})
export class ParametriaService {

  constructor(private httpClient: HttpClient) { }

  getParametro(clave: string): Observable<Parametro> {
    let parametro = { clave: clave, valor: '31/03/2022'};
    return of(parametro);
  }
}
