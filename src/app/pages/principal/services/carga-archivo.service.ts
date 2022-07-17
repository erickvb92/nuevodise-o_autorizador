import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class CargaArchivoService {

  constructor(
    @Inject('API_URL_LOADFILE') private urlLoadFile: string,
    private _http : HttpClient) { }

  enviaArchivo(file: FormData): Observable<Response> {
    return this._http.post<Response>(`${this.urlLoadFile}/files`, file);
  }
}
