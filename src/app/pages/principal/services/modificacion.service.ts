import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstanciaModificacion } from '../../../model/constancia-modificacion.model';
import { Observable, of } from 'rxjs';
import { ConstanciaInformacion } from 'src/app/model/constancia-informacion.model';
import { TipoConstancia } from 'src/app/model/tipo-constancia.model';
import { EjercicioFiscal } from 'src/app/model/ejercicio-fiscal.model';

@Injectable({
  providedIn: 'root'
})
export class ModificacionService {

  constructor(
    private _http : HttpClient
  ) { }

  consultaCF(): Observable<ConstanciaModificacion[]> {
    let resultado: ConstanciaModificacion[] = [];
    resultado.push({ id: '1', institucion:  'WIM SERVICIOS CORPORATIVOS, S A DE C V', cuenta:'1010221210' , tipo: 'INTERES FONDOS DE INVERSIÓN COLOCADOS EN BANCA', cod_cliente:'123456789', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' }); 
    resultado.push({ id: '2', institucion:  'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443', cuenta:'1010221211' , tipo: 'COMERCIAL', cod_cliente:'123456790', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '3', institucion:  'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221212' , tipo: 'ARRENDAMIENTO', cod_cliente:'123456791', folio:'AF-0500123456', estatus:'BLOQUEADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '4', institucion:  'BANCO S3 MEXICO', cuenta:'1010221213' , tipo: 'AUTOTRANSPORTE', cod_cliente:'123456792', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '5', institucion:  'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV', cuenta:'1010221214' , tipo: 'PAGOS A RESIDENTES EN EL EXTRANJERO', cod_cliente:'123456793', folio:'AF-0500123456', estatus:'BLOQUEADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '6', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221215' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '7', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221216' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '1', institucion:  'WIM SERVICIOS CORPORATIVOS, S A DE C V', cuenta:'1010221217' , tipo: 'INTERES FONDOS DE INVERSIÓN COLOCADOS EN BANCA', cod_cliente:'123456789', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '8', institucion:  'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443', cuenta:'1010221218' , tipo: 'COMERCIAL', cod_cliente:'123456790', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '9', institucion:  'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221219' , tipo: 'ARRENDAMIENTO', cod_cliente:'123456791', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '10', institucion:  'BANCO S3 MEXICO', cuenta:'1010221220' , tipo: 'AUTOTRANSPORTE', cod_cliente:'123456792', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '11', institucion:  'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV', cuenta:'1010221221' , tipo: 'PAGOS A RESIDENTES EN EL EXTRANJERO', cod_cliente:'123456793', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '12', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221222' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '13', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221223' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '14', institucion:  'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443', cuenta:'1010221224' , tipo: 'COMERCIAL', cod_cliente:'123456790', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '15', institucion:  'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221225' , tipo: 'ARRENDAMIENTO', cod_cliente:'123456791', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '16', institucion:  'BANCO S3 MEXICO', cuenta:'1010221226' , tipo: 'AUTOTRANSPORTE', cod_cliente:'123456792', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '17', institucion:  'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV', cuenta:'1010221227' , tipo: 'PAGOS A RESIDENTES EN EL EXTRANJERO', cod_cliente:'123456793', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '18', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221228' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '19', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221229' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '20', institucion:  'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443', cuenta:'1010221230' , tipo: 'COMERCIAL', cod_cliente:'123456790', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '21', institucion:  'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221231' , tipo: 'ARRENDAMIENTO', cod_cliente:'123456791', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '22', institucion:  'BANCO S3 MEXICO', cuenta:'1010221232' , tipo: 'AUTOTRANSPORTE', cod_cliente:'123456792', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '23', institucion:  'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV', cuenta:'1010221233' , tipo: 'PAGOS A RESIDENTES EN EL EXTRANJERO', cod_cliente:'123456793', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '24', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221234' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794',  folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '25', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221235' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '26', institucion:  'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443', cuenta:'1010221236' , tipo: 'COMERCIAL', cod_cliente:'123456790', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '27', institucion:  'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221237' , tipo: 'ARRENDAMIENTO', cod_cliente:'123456791', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '28', institucion:  'BANCO S3 MEXICO', cuenta:'1010221238' , tipo: 'AUTOTRANSPORTE', cod_cliente:'123456792', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '29', institucion:  'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV', cuenta:'1010221239' , tipo: 'PAGOS A RESIDENTES EN EL EXTRANJERO', cod_cliente:'123456793', folio:'AF-0500123456', estatus:'BLOQUEADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '30', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221240' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '31', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221241' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '32', institucion:  'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443', cuenta:'1010221242' , tipo: 'COMERCIAL', cod_cliente:'123456790', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '33', institucion:  'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221243' , tipo: 'ARRENDAMIENTO', cod_cliente:'123456791', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '34', institucion:  'BANCO S3 MEXICO', cuenta:'1010221244' , tipo: 'AUTOTRANSPORTE', cod_cliente:'123456792', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '35', institucion:  'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV', cuenta:'1010221245' , tipo: 'PAGOS A RESIDENTES EN EL EXTRANJERO', cod_cliente:'123456793', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '36', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221246' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '37', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221247' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '38', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221248' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '39', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221249' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '40', institucion:  'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443', cuenta:'1010221250' , tipo: 'COMERCIAL', cod_cliente:'123456790', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '41', institucion:  'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221251' , tipo: 'ARRENDAMIENTO', cod_cliente:'123456791', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '42', institucion:  'BANCO S3 MEXICO', cuenta:'1010221252' , tipo: 'AUTOTRANSPORTE', cod_cliente:'123456792', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '43', institucion:  'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV', cuenta:'1010221253' , tipo: 'PAGOS A RESIDENTES EN EL EXTRANJERO', cod_cliente:'123456793', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '44', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221254' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '45', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221255' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '46', institucion:  'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443', cuenta:'1010221256' , tipo: 'COMERCIAL', cod_cliente:'123456790', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '47', institucion:  'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221257' , tipo: 'ARRENDAMIENTO', cod_cliente:'123456791', folio:'AF-0500123456', estatus:'FLUJO ACLARACION',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '48', institucion:  'BANCO S3 MEXICO', cuenta:'1010221258' , tipo: 'AUTOTRANSPORTE', cod_cliente:'123456792', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '49', institucion:  'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV', cuenta:'1010221259' , tipo: 'PAGOS A RESIDENTES EN EL EXTRANJERO', cod_cliente:'123456793', folio:'AF-0500123456', estatus:'BLOQUEADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '50', institucion:  'SANTANDER CAPITAL STRUCTURING, S A DE C V', cuenta:'1010221260' , tipo: 'SERVICIOS PRESTADOS POR COMISIONISTAS', cod_cliente:'123456794', folio:'AF-0500123456', estatus:'CANCELADO',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular', isSello:false, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '51', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221261' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '52', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221262' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '53', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221263' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '54', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta:'1010221264' , tipo: 'SERVICIOS PROFESIONALES', cod_cliente:'123456795', folio:'AF-0500123456', estatus:'DISPONIBLE',  nombre: 'Adrian Gonzalez', participacion_cliente: 'Titular', isSello:true, disabled: false, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    resultado.push({ id: '55', institucion:  'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO', cuenta: '1010221265', tipo: 'SERVICIOS PROFESIONALES', cod_cliente: '123456795', folio: 'AF-0500123456', estatus: 'DISPONIBLE', nombre: 'Adrian Gonzalez', participacion_cliente: 'Cotitular',isSello: true, disabled: true, ejercicioFiscal: 2021, rfc: 'GOLA8004242L3', cveTipo: 'J' });
    
    return of(resultado);
  }

  getConstanciaInformacion(constancia: ConstanciaModificacion): Observable<ConstanciaInformacion> {
    console.log("Busqueda de informacion a travez de registro constancia Modificacion")
    console.log(constancia)
    let resultado: ConstanciaInformacion =
    {
      general: {
        ejercicio: "2018",
        periodo: "2018-2019",
        tipoConstancia: "5",
        folioInterno: "AR-000000001",
        claveRetencion: "RTRC",
        descRetencion: "RTRC",
        aField: "ASD"
      },
      datosEmisor: {
          institucion: "34",
          rfc: "DUMA310393TCQ",
          calle: "Prueba",
          noExt: "1",
          noInt: "1",
          cp: "76049",
          colonia: "1",
          delegacionMunicipio: "QUERETARO",
          estado: "QUERETARO",
          pais: "México",
          regimenFiscal: "REGIMEN DE PRUEBA",
          lugarExpedicion: "QUERETARO"
      },
      datosReceptor: {
          nombreRazonSocial: "RAZON PRUEBA QUERETARO",
          rfc: "2",
          numProv: "127",
          curp: "DUMA310393TCQ",
          nacionalidad: "MEXICANA",
          cp: "76049",
          colonia: "1",
          calle: "CALLE PRUEBA",
          noExt: "1",
          noInt: "1",
          delegacionMunicipio: "QUERETARO",
          estado: "QUERETARO",
          pais: "MEXICO",
          paisResidencia: "MEXICO",
          esBenefEfect: "1",
          conceptoPago: "CONCCEPTO PRUEBA",
          descripcionConcepto: "DESC CONCEPTO PRUEBA"
      },
      datosOperacion: {
          baseRetencionIsr: "1000",
          impuestoRetenidoIsr: "1000",
          tipoRetencionIsr: "RET",
          baseRetencionIva: "100",
          impuestoRetenidoIva: "100",
          tipoRetencionIva: "RET2",
          montoTotalOperacion: "1100",
          montoTotalGravado: "1000",
          montoTotalExento: "1000",
          montoTotalRetenido: "1000"
      }
  };
    return of(resultado);
  }
}
