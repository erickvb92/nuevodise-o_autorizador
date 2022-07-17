import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConstanciaRequestCfdi } from '../../../model/constancia-request-cfdi.model';
import { Constancia } from '../../../model/constancia.model';
import { DownloadCf } from '../../../model/download-cf.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraccionService {

  constructor(
    @Inject('API_URL_DOWNLOADCF') private urlDownloadCf: string,
    private httpClient: HttpClient) { }

  consultaCF(): Observable<Constancia[]> {
    let resultado: Constancia[] = [];
    resultado.push({ id: '1', tipo: 'Tipo 1', nombre: 'Adrian Gonzalez', folio: 'AR-0000000001', cuenta: '9825753457345', estatus: 'DISPONIBLE', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', cod_cliente: '5463586', participacion_cliente: 'Titular', disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '2', tipo: 'Tipo 1', nombre: 'Adrian Gonzalez', folio: 'AR-0000000002', cuenta: '9825753457345', estatus: 'BLOQUEADO', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', cod_cliente: '5463587', participacion_cliente: 'Cotitular', disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '3', tipo: 'Tipo 1', nombre: 'Adrian Gonzalez', folio: 'AR-0000000003', cuenta: '9825753457345', estatus: 'DISPONIBLE', institucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V', cod_cliente: '5463588', participacion_cliente: 'Cotitular', disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '4', tipo: 'Tipo 1', nombre: 'Adrian Gonzalez', folio: 'AR-0000000004', cuenta: '9825753457345', estatus: 'DISPONIBLE', institucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V', cod_cliente: '5463589', participacion_cliente: 'Titular', disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '5', tipo: 'Tipo 1', nombre: 'Adrian Gonzalez', folio: 'AR-0000000005', cuenta: '9825753457345', estatus: 'DISPONIBLE', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', cod_cliente: '5463510', participacion_cliente: 'Titular', disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '6', tipo: 'Tipo 1', nombre: 'Adrian Gonzalez', folio: 'AR-0000000006', cuenta: '9825753457345', estatus: 'DISPONIBLE', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', cod_cliente: '5463511', participacion_cliente: 'Titular', disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '7', tipo: 'Tipo 1', nombre: 'Adrian Gonzalez', folio: 'AR-0000000007', cuenta: '9825753457345', estatus: 'BLOQUEADO', institucion: 'ASESORIA ESTRATEGA, S C', cod_cliente: '5463512', participacion_cliente: 'Titular', disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '8', tipo: 'Tipo 1', nombre: 'Adrian Gonzalez', folio: 'AR-0000000008', cuenta: '9825753457345', estatus: 'DISPONIBLE', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', cod_cliente: '5463513', participacion_cliente: 'Cotitular', disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    return of(resultado);
  }

  getDocumentosPdf(constanciaCfdi: ConstanciaRequestCfdi): Observable<DownloadCf> {
    return this.httpClient.post<DownloadCf>(`${this.urlDownloadCf}/download/cfpdf`, constanciaCfdi);
  }

  getSellosXml(constanciaCfdi: ConstanciaRequestCfdi): Observable<DownloadCf> {
    return this.httpClient.post<DownloadCf>(`${this.urlDownloadCf}/download/cfxml`, constanciaCfdi);
  }

  generarZip(constanciasCfdi: ConstanciaRequestCfdi[]): Observable<String> {
    return this.httpClient.post<String>(`${this.urlDownloadCf}/download/getCfpdfxml`, constanciasCfdi);
  }

  generarZipPdf(constanciasCfdi: ConstanciaRequestCfdi[]): Observable<DownloadCf> {
    return this.httpClient.post<DownloadCf>(`${this.urlDownloadCf}/download/getCfpdf`, constanciasCfdi);
  }

  generarZipXml(constanciasCfdi: ConstanciaRequestCfdi[]): Observable<DownloadCf> {
    return this.httpClient.post<DownloadCf>(`${this.urlDownloadCf}/download/getCfxml`, constanciasCfdi);
  }
}

