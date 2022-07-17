import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClaconesModel, NewClaclonModel } from 'src/app/model/caclones.model';
import { AdminCatalogosService } from './admin-catalogos.service';
import { ClaveClaconesModel, DivisaClaconesModel, NombreClaconesModel, OrigenClaconesModel, SubClaveClaconesModel } from 'src/app/model/catalogos-caclones.model';

const CLACONESDUMMY: ClaconesModel[] = [
  {
    id: 1,
    clave: { id: '1', nombreClave: 'CLACON', descripcion: 'Clabes Contables'},
    subclave: { id: '1', nombreSub: 'VISTA', descripcion: ''},
    codigo: '0014',
    indicadorA: 'S',
    indicadorB: 'N',
    nombre: { id: '1', nombre: 'PAGOSM', descripcion: ''},
    origen: { id: '1', nombreOrigen: 'CAPTACION', descripcion: ''},
    complemento: 'ALGUNO',
    divisa: null,
    descripcion: 'Ab intereses manuales',
    detalle: '',
    activo: true
  },
  {
    id: 2,
    clave: { id: '1', nombreClave: 'CLACON', descripcion: 'Clabes Contables'},
    subclave: { id: '1', nombreSub: 'VISTA', descripcion: ''},
    codigo: '0060',
    indicadorA: 'S',
    indicadorB: '',
    nombre: { id: '2', nombre: 'LIQVTA', descripcion: ''},
    origen: { id: '1', nombreOrigen: 'CAPTACION', descripcion: ''},
    complemento: 'ALGUNO',
    divisa: null,
    descripcion: 'Ab intereses',
    detalle: '',
    activo: true
  },
  {
    id: 3,
    clave: { id: '1', nombreClave: 'CLACON', descripcion: 'Clabes Contables'},
    subclave: { id: '1', nombreSub: 'VISTA', descripcion: ''},
    codigo: '0514',
    indicadorA: '',
    indicadorB: '',
    nombre: { id: '3', nombre: 'ANULAC', descripcion: ''},
    origen: { id: '1', nombreOrigen: 'CAPTACION', descripcion: ''},
    complemento: '',
    divisa: null,
    descripcion: 'Anu pgo ints manuales',
    detalle: '',
    activo: true
  },
  {
    id: 4,
    clave: { id: '3', nombreClave: 'SUBPRO', descripcion: 'Subproducto'},
    subclave: { id: '2', nombreSub: 'PLAZO', descripcion: ''},
    codigo: '0069',
    indicadorA: '',
    indicadorB: '',
    nombre: null,
    origen: { id: '1', nombreOrigen: 'CAPTACION', descripcion: ''},
    complemento: '',
    divisa: null,
    descripcion: 'Liquidacion interes plazo',
    detalle: '',
    activo: true
  },
  {
    id: 5,
    clave: { id: '2', nombreClave: 'CLAMON', descripcion: 'Clabes Monetarias'},
    subclave: { id: '1', nombreSub: 'VISTA', descripcion: ''},
    codigo: '9999',
    indicadorA: '',
    indicadorB: '',
    nombre: { id: '4', nombre: 'GANCAM', descripcion: ''},
    origen: { id: '1', nombreOrigen: 'CAPTACION', descripcion: ''},
    complemento: '',
    divisa: { id: '1', nombreDivisa: 'USD', descripcion: ''},
    descripcion: 'Inclusion total claves monetarias',
    detalle: '',
    activo: true
  },
  {
    id: 6,
    clave: { id: '3', nombreClave: 'SUBPRO', descripcion: 'Subproducto'},
    subclave: { id: '1', nombreSub: 'HIPOT', descripcion: ''},
    codigo: '3594',
    indicadorA: '0',
    indicadorB: '2',
    nombre: null,
    origen: { id: '2', nombreOrigen: 'CARTERA', descripcion: ''},
    complemento: '',
    divisa: null,
    descripcion: 'Producto Hipotecario',
    detalle: '',
    activo: true
  }
]

@Injectable({
  providedIn: 'root'
})
export class ClaconesService {

  clavesClaconesList: ClaveClaconesModel[] = [];
  subclavesClaconesList: SubClaveClaconesModel[] = [];
  nombreClaconesList: NombreClaconesModel[] = [];
  origenClaconesList: OrigenClaconesModel[] = [];
  divisasClaconesList: DivisaClaconesModel[] = [];

  constructor(
    private catService: AdminCatalogosService
  ) { }

  caclonesDummy: ClaconesModel[] = [];

  getCaclonesData(id: string | number, status: boolean): Observable<ClaconesModel[]> {
    this.caclonesDummy = CLACONESDUMMY;
    if(id) {
      this.caclonesDummy = this.caclonesDummy.filter( clacon =>  clacon?.clave?.id === id && clacon?.activo === status);
      return of (this.caclonesDummy);
    }
    this.caclonesDummy = this.caclonesDummy.filter( clacon => clacon?.activo === status);
    return of (this.caclonesDummy);
  }

  addNewClacon(data: NewClaclonModel) {
    const id = CLACONESDUMMY.length + 1;
    this.getCatalogos();
    const claveSelected = this.clavesClaconesList.find(clave => clave.id === data.idClave);
    const subclaveSelected = this.subclavesClaconesList.find(sub => sub.id = data.idSubclave);
    const nombreSelected = this.nombreClaconesList.find(nombre => nombre.id = data.idNombre);
    const origenSelected = this.origenClaconesList.find(origen => origen.id = data.idOrigen);
    const divisaSelected = this.divisasClaconesList.find(divisa => divisa.id = data.idDivisa);
    const newClacon: ClaconesModel = {
      id: id,
      clave: claveSelected,
      subclave: subclaveSelected,
      codigo: data.codigo,
      indicadorA: data.indicadorA,
      indicadorB: data.indicadorB,
      nombre: nombreSelected,
      origen: origenSelected,
      complemento: data.complemento,
      divisa: divisaSelected,
      descripcion: data.descripcion,
      detalle: data.detalle,
      activo: true
    }

    CLACONESDUMMY.push(newClacon);
    return of(CLACONESDUMMY);

  }

  updateClacon(idClaclon: number, data: NewClaclonModel) {
    this.getCatalogos();
    const claveSelected = this.clavesClaconesList.find(clave => clave.id === data.idClave);
    const subclaveSelected = this.subclavesClaconesList.find(sub => sub.id = data.idSubclave);
    const nombreSelected = this.nombreClaconesList.find(nombre => nombre.id = data.idNombre);
    const origenSelected = this.origenClaconesList.find(origen => origen.id = data.idOrigen);
    const divisaSelected = this.divisasClaconesList.find(divisa => divisa.id = data.idDivisa);
    const newClacon: ClaconesModel = {
      id: idClaclon,
      clave: claveSelected,
      subclave: subclaveSelected,
      codigo: data.codigo,
      indicadorA: data.indicadorA,
      indicadorB: data.indicadorB,
      nombre: nombreSelected,
      origen: origenSelected,
      complemento: data.complemento,
      divisa: divisaSelected,
      descripcion: data.descripcion,
      detalle: data.detalle,
      activo: true
    }

    const index = CLACONESDUMMY.findIndex(clacon => clacon.id === idClaclon);
    CLACONESDUMMY.splice(index, 1, newClacon);
    return of(CLACONESDUMMY);
  }

  deleteClacon(id: number): Observable<ClaconesModel[]> {
    const index = CLACONESDUMMY.findIndex(clacon => clacon.id === id);
    console.log(index);
    CLACONESDUMMY.splice(index, 1);
    return of(CLACONESDUMMY);
  }

  changeStatusClacon(idClacon: number, status: boolean): Observable<ClaconesModel[]> {
    const index = CLACONESDUMMY.findIndex(clacon => clacon.id === idClacon);
    CLACONESDUMMY[index].activo =  status;
    return of(CLACONESDUMMY);
  }

  getCatalogos() {
    this.catService.getAllCatalogosClacones().subscribe({
      next: response=>  {
        this.clavesClaconesList = response[0];
        this.subclavesClaconesList = response[1];
        this.nombreClaconesList = response[2];
        this.origenClaconesList = response[3];
        this.divisasClaconesList = response[4];
      },
      error: error => console.log(error)
    })
  }
}
