import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MotivoCancelar } from '../../../model/motivo-cancelar.model';
import { ConstanciaCancelacion } from '../../../model/constancia-cancelacion.model';

@Injectable({
  providedIn: 'root'
})
export class CancelacionService {

  constructor(
    private httpClient: HttpClient) { }

  getMotivosCancelar(): Observable<MotivoCancelar[]> {
    let resultado: MotivoCancelar[] = [];
    resultado.push({ id: '02', motivo: '02 - Comprobantes emitidos con errores sin relación' });
    resultado.push({ id: '03', motivo: '03 - No se llevó a cabo la operación' });
    return of(resultado);
  }

  consultaCF(): Observable<ConstanciaCancelacion[]> {
    let resultado: ConstanciaCancelacion[] = [];
    resultado.push({ id: '1', tipo: 'AUTOTRANSPORTE', folio: 'AR-0000000001', cod_cliente: '5463586', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'DISPONIBLE', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '2', tipo: 'AUTOTRANSPORTE', folio: 'AR-0000000002', cod_cliente: '5463587', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'DISPONIBLE', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '3', tipo: 'AUTOTRANSPORTE', folio: 'AR-0000000003', cod_cliente: '5463588', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'DISPONIBLE', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '4', tipo: 'ARRENDAMIENTO', folio: 'AR-0000000004', cod_cliente: '5463589', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'CANCELADO', institucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '5', tipo: 'SERVICIOS PROFESIONALES', folio: 'AR-0000000005', cod_cliente: '5463510', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'CANCELADO', institucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '6', tipo: 'SERVICIOS PROFESIONALES', folio: 'AR-0000000006', cod_cliente: '5463511', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'BLOQUEADO', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '7', tipo: 'SERVICIOS PROFESIONALES', folio: 'AR-0000000007', cod_cliente: '5463512', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'BLOQUEADO', institucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '8', tipo: 'ARRENDAMIENTO', folio: 'AR-0000000008', cod_cliente: '5463513', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'FLUJO ACLARACION', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '9', tipo: 'ARRENDAMIENTO', folio: 'AR-0000000009', cod_cliente: '5463514', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'FLUJO ACLARACION', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '10', tipo: 'PAGOS RESIDENTES EXTRANJERO', folio: 'AR-0000000010', cod_cliente: '5463515', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'FLUJO ACLARACION', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '11', tipo: 'PAGOS RESIDENTES EXTRANJERO', folio: 'AR-0000000011', cod_cliente: '5463516', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'CANCELADO', institucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '12', tipo: 'SERVICIOS PROFESIONALES COMISIONISTA', folio: 'AR-0000000012', cod_cliente: '5463517', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'CANCELADO', institucion: 'ASESORIA ESTRATEGA, S C', nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '13', tipo: 'ARRENDAMIENTO', folio: 'AR-0000000013', cod_cliente: '5463518', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'BLOQUEADO', institucion: 'ASESORIA ESTRATEGA, S C', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    resultado.push({ id: '14', tipo: 'ARRENDAMIENTO', folio: 'AR-0000000014', cod_cliente: '5463519', cuenta: '9825753457345', rfc: 'GOLA8004242L3', ejercicioFiscal: 2021, idMotivo: '', comentario: '', estatus: 'BLOQUEADO', institucion: 'ASESORIA ESTRATEGA, S C', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', sellosCancelar: new Array(), disabled: false, cveTipo: 'J' });
    return of(resultado);
  }
}
