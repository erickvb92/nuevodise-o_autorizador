import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LogotipoModel } from 'src/app/model/logotipo.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {


  constructor(
    @Inject('API_URL_CATALOGOS') private urlCatalogos: string,
    private http: HttpClient) { }

  fileUpload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append(file.name, file);
    return this.http.post("/api/thumbnail-upload", formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  fileUploadDummy(data: LogotipoModel): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(data);
    return this.http.post(`${this.urlCatalogos}/logotipos/`, body, {
      'headers': headers
    }).pipe(
      map ( response => {
        return {
          response,
          message: 'Archivo cargado con éxito'
        }
      })
    );
  }

  getRecord(id: string | number): Observable<LogotipoModel[]> {
    return this.http.get<LogotipoModel[]>(`${this.urlCatalogos}/logotipos?idEmpresa=${id}`)
  }

  getAllLogotipos(): Observable<number> {
    return this.http.get<LogotipoModel[]>(`${this.urlCatalogos}/logotipos`)
    .pipe( map( total => total.length)
    )
  }

  updateFile(id: number, data: Partial<LogotipoModel>): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.patch<LogotipoModel>(`${this.urlCatalogos}/logotipos/${id}`, data, {
      'headers': headers
    }).pipe(
      map( response => {
        return {
          response,
          message: 'Archivo actualizado con éxito'
        }
      })
    )
  }
}
