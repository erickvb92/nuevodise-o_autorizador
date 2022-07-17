import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConstanciaBloqueo } from '../../../model/constancia-bloqueo.model';

@Injectable({
  providedIn: 'root'
})
export class BloqueoService {

  constructor(private httpClient: HttpClient) { }

  consultaCF(): Observable<ConstanciaBloqueo[]> {
    let resultado: ConstanciaBloqueo[] = [];
    resultado.push({ id: '1', tipo: 'Tipo 1', folio: 'AR-0000000001', cuenta: '1010221210', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', estatus: 'DISPONIBLE', cod_cliente: '8989700', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '2', tipo: 'Tipo 1', folio: 'AR-0000000002', cuenta: '1010221211', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', estatus: 'DISPONIBLE', cod_cliente: '8989701', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '3', tipo: 'Tipo 1', folio: 'AR-0000000003', cuenta: '1010221212', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', estatus: 'DISPONIBLE', cod_cliente: '8989702', institucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '4', tipo: 'Tipo 1', folio: 'AR-0000000004', cuenta: '1010221213', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', estatus: 'DISPONIBLE', cod_cliente: '8989703', institucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '5', tipo: 'Tipo 1', folio: 'AR-0000000005', cuenta: '1010221214', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', estatus: 'BLOQUEADO', cod_cliente: '8989704', institucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '6', tipo: 'Tipo 1', folio: 'AR-0000000006', cuenta: '1010221215', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', estatus: 'BLOQUEADO', cod_cliente: '8989705', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '7', tipo: 'Tipo 1', folio: 'AR-0000000007', cuenta: '1010221216', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', estatus: 'BLOQUEADO', cod_cliente: '8989706', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '8', tipo: 'Tipo 1', folio: 'AR-0000000008', cuenta: '1010221217', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', estatus: 'BLOQUEADO', cod_cliente: '8989707', institucion: 'ASESORIA ESTRATEGA, S C', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '9', tipo: 'Tipo 1', folio: 'AR-0000000009', cuenta: '1010221218', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', estatus: 'BLOQUEADO', cod_cliente: '8989708', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '10', tipo: 'Tipo 1', folio: 'AR-0000000010', cuenta: '1010221219', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', estatus: 'BLOQUEADO', cod_cliente: '8989709', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '11', tipo: 'Tipo 1', folio: 'AR-0000000011', cuenta: '1010221220', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', estatus: 'DISPONIBLE', cod_cliente: '8989710', institucion: 'ASESORIA ESTRATEGA, S C', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '12', tipo: 'Tipo 1', folio: 'AR-0000000012', cuenta: '1010221221', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', estatus: 'DISPONIBLE', cod_cliente: '8989711', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', bloqueo: false, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    return of(resultado);
  }

  bloquearCF(constancia: ConstanciaBloqueo): Observable<String> {
    return of('bloqueo exitoso');
  }

  desbloquearCF(constancia: ConstanciaBloqueo): Observable<String> {
    return of('desbloqueo exitoso');
  }
}
