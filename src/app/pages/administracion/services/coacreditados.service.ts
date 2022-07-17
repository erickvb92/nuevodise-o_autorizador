import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CoacreditadoModel, CoacreditadoFileModel, TipoCoacreditadoModel, CreateCoacreditadoModel } from 'src/app/model/coacreditado.model';

let COACREDITADOSDUMMY: CoacreditadoModel[] = [];
@Injectable({
  providedIn: 'root'
})

export class CoacreditadosService {
  dataDummySave: CoacreditadoModel[] = [
    {
      id: 1,
      contrato: '20001150208',
      subcontrato: '29746427',
      nombreCompleto: 'GUILLERMO RAMIREZ LOAIZA',
      solicitante: {
        id: 1,
        clave: 'TI',
        descripcion: 'Títular'
      },
      porcentaje: 50,
      calle:'SAN NARCIZO',
      noExt: '186',
      noInt: '',
      colonia: 'LOMAS DE SAN GONZALO',
      cp: '45134',
      delegacion: 'ZAPOPAN',
      estado: 'JALISCO',
      fecha: new Date(),
      rfc: 'BEHS660926MZ6'
    },
    {
      id: 2,
      contrato: '20001150208',
      subcontrato: '11220240',
      nombreCompleto: 'MARIA SOLEDAD BECERRA HERNANDEZ',
      solicitante: {
        id: 2,
        clave: 'CO',
        descripcion: 'Coacreditado'
      },
      porcentaje: 50,
      calle:'SAN NARCIZO',
      noExt: '186',
      noInt: '',
      colonia: 'LOMAS DE SAN GONZALO',
      cp: '45134',
      delegacion: 'ZAPOPAN',
      estado: 'JALISCO',
      fecha: new Date(),
      rfc: 'BEHS660926MZ6'
    },
    {
      id: 3,
      contrato: '20001150209',
      subcontrato: '11220241',
      nombreCompleto: 'JOSE LUIS HERNANDEZ',
      solicitante: {
        id: 1,
        clave: 'TI',
        descripcion: 'Títular'
      },
      porcentaje: 100,
      calle:'SAN RAFAEL',
      noExt: '213',
      noInt: '',
      colonia: 'SAN CAYETANO',
      cp: '20324',
      delegacion: 'AGUASCALIENTES',
      estado: 'AGUASCALIENTES',
      fecha: new Date(),
      rfc:'MIAR701123TN7'
    }
  ];

  tipoCoacreditados: TipoCoacreditadoModel[] = [
    {id: 1, clave: 'TI', descripcion: 'Títular'},
    {id: 2, clave: 'CO', descripcion: 'Coacreditado'}
  ];

  catalogoPorcentajes: any[] = [
    {id:1, value: '0'},
    {id:2, value: '50'},
    {id:3, value: '100'}
  ];

  constructor(
    @Inject('API_URL_CATALOGOS') private urlCatalogos: string,
    private http: HttpClient
  ) { }

  getAllRecords(): Observable<number> {
    return this.http.get<CoacreditadoFileModel[]>(`${this.urlCatalogos}/coacreditados`)
    .pipe( map( total => total.length)
    )
  }

  fileUploadDummy(data: CoacreditadoFileModel): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(data);
    return this.http.post(`${this.urlCatalogos}/coacreditados/`, body, {
      'headers': headers
    }).pipe(
      map ( response => {
        COACREDITADOSDUMMY = [...COACREDITADOSDUMMY, ...this.dataDummySave]
        return {
          save: response,
          message: 'Archivo cargado con éxito',
          response: COACREDITADOSDUMMY
        }
      })
    );
  }

  getAllCoacreditados(
    noContrato: string = '',
    subContrato: string = '',
    rfc: string ): Observable<CoacreditadoModel[]> {
    const result =  COACREDITADOSDUMMY.filter(coacreditado => coacreditado.contrato.includes(noContrato) &&
    coacreditado.subcontrato.includes(subContrato) && coacreditado.rfc.includes(rfc));
    // console.log(result);
    return of (result);
  }

  getCoacreditadoByContract(contrato: string): Observable<CoacreditadoModel[]> {
    const coacreditados = COACREDITADOSDUMMY.filter( coacreditado => coacreditado.contrato === contrato);
    return of (coacreditados);
  }

  saveCoacreditado(data: CreateCoacreditadoModel): Observable<any> {
    const tipoSolicitante = this.tipoCoacreditados.find( tipo => tipo.id === data.idSolicitante);
    const idToSave = 3 + COACREDITADOSDUMMY.length + 1;
    const coacBack: CoacreditadoModel = {
      id:  idToSave,
      contrato: data.contrato,
      subcontrato: data.subcontrato,
      nombreCompleto: data.nombreCompleto,
      solicitante: tipoSolicitante,
      porcentaje: (data.porcentaje),
      calle: data.calle,
      noExt: data.noExt,
      noInt: data.noInt,
      colonia: data.colonia,
      cp: data.cp,
      delegacion: data.delegacion,
      estado: data.estado,
      fecha: data.fecha,
      rfc: data.rfc
    };

    COACREDITADOSDUMMY.push(coacBack);
    return of ({
      response: COACREDITADOSDUMMY,
      message: 'Coacreditado registrado con éxito'
    })
  }

  updateCoacreditado(idCoac: number, data: CreateCoacreditadoModel) {
    console.log(data)
    const tipoSolicitante = this.tipoCoacreditados.find( tipo => tipo.id === data.idSolicitante);
    const coacBack: CoacreditadoModel = {
      id:  idCoac,
      contrato: data.contrato,
      subcontrato: data.subcontrato,
      nombreCompleto: data.nombreCompleto,
      solicitante: tipoSolicitante,
      porcentaje: (data.porcentaje),
      calle: data.calle,
      noExt: data.noExt,
      noInt: data.noInt,
      colonia: data.colonia,
      cp: data.cp,
      delegacion: data.delegacion,
      estado: data.estado,
      fecha: data.fecha,
      rfc: data.rfc
    };

    const index = COACREDITADOSDUMMY.findIndex(coac => coac.id === idCoac);
    COACREDITADOSDUMMY.splice(index, 1, coacBack);
    return of ({
      response: COACREDITADOSDUMMY,
      message: 'Coacreditado actualizado con éxito'
    })
  }

  deleteCoacreditado(coacreditado: CoacreditadoModel): Observable<any> {
    const totCoac = COACREDITADOSDUMMY.filter(coac => coac.contrato.includes(coacreditado.contrato));
    if(totCoac.length > 1 && coacreditado.solicitante?.id === 1){
      return of ({
        status: '0',
        message: 'El títular de este contrato no puede eliminarse porque cuenta con un coacreditado adicional',
        response: COACREDITADOSDUMMY
      });
    }
    const index = COACREDITADOSDUMMY.findIndex( coac => coac.id === coacreditado.id);
    COACREDITADOSDUMMY.splice(index, 1);
    return of ({
      status: '18',
      message: 'Registro eliminado correctamente',
      response: COACREDITADOSDUMMY
    });
  }


  getTipoCoacreditado(): Observable<TipoCoacreditadoModel[]> {
    return of (this.tipoCoacreditados);
  }

  getCatalogoPorcentajes(): Observable<any[]> {
    return of (this.catalogoPorcentajes);
  }

  getTitularAvailable(contrato: string): Observable<boolean> {
    const titular = COACREDITADOSDUMMY.find(
      coacreditado =>  coacreditado.contrato === contrato && coacreditado?.solicitante?.id === 1
    );
    if (!titular) {
      return  of (true);
    }
    return of(false);
  }

  getCoacreditadoAvailable(contrato: string): Observable<boolean> {
    const coac = COACREDITADOSDUMMY.find(
      coacreditado =>  coacreditado.contrato === contrato && coacreditado?.solicitante?.id === 2
    );
    if (!coac) {
      return  of (true);
    }
    return of(false);
  }


}
