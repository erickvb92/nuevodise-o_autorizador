import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TipoConstancia } from '../../../model/tipo-constancia.model';
import { EjercicioFiscal } from '../../../model/ejercicio-fiscal.model';
import { Institucion } from '../../../model/institucion.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
 
  constructor(private httpClient: HttpClient) { }

  getTiposConstancia(): Observable<TipoConstancia[]> {
    let resultado: TipoConstancia[] = [];
    resultado.push({ id: '1', tipo: 'AUTOTRANSPORTE' });
    resultado.push({ id: '2', tipo: 'ARRENDAMIENTO' });
    resultado.push({ id: '3', tipo: 'SERVICIOS PROFESIONALES' });
    resultado.push({ id: '4', tipo: 'SERVICIOS PROFESIONALES COMISIONISTA' });
    resultado.push({ id: '5', tipo: 'PAGOS RESIDENTES EXTRANJERO' });
    return of(resultado);
  }
 
  getEjerciciosFiscales(): Observable<EjercicioFiscal[]> {
    let today = new Date();
    let anioActual = today.getUTCFullYear();
    let resultado: EjercicioFiscal[] = [];
    let cont = 1;
    while(cont <= 8) { 
      resultado.push({ id: String(anioActual), ejercicio: String(anioActual) });
      anioActual = anioActual - 1;
      cont++;
    }
    return of(resultado);
  }

  getInstituciones(): Observable<Institucion[]> {
    let resultado: Institucion[] = [];
    resultado.push({ id: '33', rfc: 'TOP141110391', descInstitucion: 'TOPSAM, S A DE C V' });
    resultado.push({ id: '34', rfc: 'UME000807UQ5', descInstitucion: 'UNIVERSIA MEXICO, S A DE C V' });
    resultado.push({ id: '35', rfc: 'WSC051021HY9', descInstitucion: 'WIM SERVICIOS CORPORATIVOS, S A DE C V' });
    resultado.push({ id: '36', rfc: 'FEI160804J20', descInstitucion: 'FIDEICOMISO EMPRESARIAL IRREVOCABLE DE ADMINISTRACION Y GARANTIA, NUMERO F/3443' });
    resultado.push({ id: '37', rfc: 'SIF170801PYA', descInstitucion: 'SANTANDER INCLUSION FINANCIERA S. A. DE C. V., SOFOM E.R. GRUPO FINANCIERO SANTANDER MEXICO' });
    resultado.push({ id: '38', rfc: 'BSM161122Q93', descInstitucion: 'BANCO S3 MEXICO' });
    resultado.push({ id: '39', rfc: 'GFS17123129A', descInstitucion: 'GRUPO FINANCIERO SANTANDER MEXICO SA DE CV' });
    resultado.push({ id: '26', rfc: 'CAL010913I43', descInstitucion: 'SANTANDER CAPITAL STRUCTURING, S A DE C V' });
    resultado.push({ id: '27', rfc: 'SCO811026KFA', descInstitucion: 'SANTANDER CONSUMO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO' });
    resultado.push({ id: '28', rfc: 'SGF950106ST5', descInstitucion: 'SANTANDER GLOBAL FACILITIES, S A DE C V' });
    resultado.push({ id: '29', rfc: 'SGP080709Q83', descInstitucion: 'SANTANDER GLOBAL PROPERTY MEXICO, S A DE C V' });
    resultado.push({ id: '30', rfc: 'SSC010528H75', descInstitucion: 'SANTANDER SERVICIOS CORPORATIVOS, S A DE C V' });
    resultado.push({ id: '31', rfc: 'SSE1101243V4', descInstitucion: 'SANTANDER SERVICIOS ESPECIALIZADOS, S A DE C V' });
    resultado.push({ id: '32', rfc: 'SCR020821SH3', descInstitucion: 'SERVICIOS DE COBRANZA RECUPERACION Y SEGUIMIENTO, S A DE C V' });
    resultado.push({ id: '0', rfc: 'BSM970519DU8', descInstitucion: 'BANCO SANTANDER MEXICO S. A., INSTITUCION DE BANCA MULTIPLE, GRUPO FINANCIERO SANTANDER MEXICO' });
    resultado.push({ id: '3', rfc: 'CBS9711171Y6', descInstitucion: 'CASA DE BOLSA SANTANDER, S A DE C V, GRUPO FINANCIERO SANTANDER MEXICO' });
    resultado.push({ id: '4', rfc: 'SHI090313P50', descInstitucion: 'SANTANDER HIPOTECARIO, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO' });
    resultado.push({ id: '5', rfc: 'IHI980420SQ8', descInstitucion: 'SANTANDER VIVIENDA, S A DE C V SOFOM ER, GRUPO FINANCIERO SANTANDER MEXICO' });
    resultado.push({ id: '6', rfc: 'BSF0403296L5', descInstitucion: 'BANCA SERFIN, S A FIDEICOMISO 100740' });
    resultado.push({ id: '7', rfc: 'FGB9901186X3', descInstitucion: 'FIDEICOMISO GFSSLPT BANCA SERFIN, S A' });
    resultado.push({ id: '10', rfc: 'ABD050823ME0', descInstitucion: 'ADMINISTRADORA BLUE 2234, S DE R L DE C V' });
    resultado.push({ id: '11', rfc: 'AME001011JS3', descInstitucion: 'AQUANIMA MEXICO, S DE R L DE C V' });
    resultado.push({ id: '12', rfc: 'AES990210SN5', descInstitucion: 'ASESORIA ESTRATEGA, S C' });
    resultado.push({ id: '13', rfc: 'ISS921202N32', descInstitucion: 'CENTRO DE CAPACITACION SANTANDER, A C' });
    resultado.push({ id: '14', rfc: 'CAM150603CV3', descInstitucion: 'COBRANZA AMIGABLE, SAPI C V' });
    resultado.push({ id: '15', rfc: 'DES051007BF2', descInstitucion: 'DIRECCION ESTRATEGA, S C' });
    resultado.push({ id: '16', rfc: 'GEO090220PB5', descInstitucion: 'SANTANDER GLOBAL OPERATIONS' });
    resultado.push({ id: '17', rfc: 'GMS940701DK0', descInstitucion: 'GESBAN MEXICO SERVICIOS ADMINISTRATIVOS GLOBALES, S A DE C V' });
    resultado.push({ id: '18', rfc: 'GAL0404143G0', descInstitucion: 'OPERADORA DE ACTIVOS GAMA SAPI DE CV' });
    resultado.push({ id: '19', rfc: 'GFS970519D19', descInstitucion: 'GRUPO FINANCIERO SANTANDER MEXICO, S A DE C V' });
    resultado.push({ id: '20', rfc: 'IME030218UTA', descInstitucion: 'SANTANDER TECNOLOGIA MEXICO S.A. DE C.V.' });
    resultado.push({ id: '21', rfc: 'OAA010109C52', descInstitucion: 'OPERADORA DE ACTIVOS ALFA, S A DE C V' });
    resultado.push({ id: '22', rfc: 'OAB020912FK8', descInstitucion: 'OPERADORA DE ACTIVOS BETA, S A DE C V' });
    resultado.push({ id: '23', rfc: 'PSI980605UE3', descInstitucion: 'PRODUBAN SERVICIOS INFORMATICOS GENERALES, S L' });
    resultado.push({ id: '24', rfc: 'PSS060804T7A', descInstitucion: 'PROMOCIONES Y SERVICIOS SANTIAGO, S A DE C V' });
    resultado.push({ id: '25', rfc: 'GSC950906H37', descInstitucion: 'SAM ASSET MANAGEMENT, S A DE C V, SOCIEDAD OPERADORA DE FONDOS DE INVERSION' });
    return of(resultado);
  } 
}

