import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { ClaveClaconesModel, DivisaClaconesModel, NombreClaconesModel, OrigenClaconesModel, SubClaveClaconesModel } from 'src/app/model/catalogos-caclones.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCatalogosService {

  constructor() { }

  getClabeTipoClacones(): Observable<ClaveClaconesModel[]> {
    let catalogo: ClaveClaconesModel[] = [];
    catalogo.push({ id: '1', nombreClave: 'CLACON', descripcion: 'Clabes Contables'});
    catalogo.push({ id: '2', nombreClave: 'CLAMON', descripcion: 'Clabes Monetarias'});
    catalogo.push({ id: '3', nombreClave: 'SUBPRO', descripcion: 'Subproducto'});
    return of (catalogo);
  }

  getSubClaveTipoClacones(): Observable<SubClaveClaconesModel[]> {
    let catalogo: SubClaveClaconesModel[] = [];
    catalogo.push({ id: '1', nombreSub: 'VISTA', descripcion: ''});
    catalogo.push({ id: '2', nombreSub: 'PLAZO', descripcion: ''});
    catalogo.push({ id: '3', nombreSub: 'HIPOT', descripcion: ''});
    return of (catalogo);
  }

  getNombreTipoClacones(): Observable<NombreClaconesModel[]> {
    let catalogo: NombreClaconesModel[] = [];
    catalogo.push({ id: '1', nombre: 'PAGOSM', descripcion: ''});
    catalogo.push({ id: '2', nombre: 'LIQVTA', descripcion: ''});
    catalogo.push({ id: '3', nombre: 'ANULAC', descripcion: ''});
    catalogo.push({ id: '4', nombre: 'GANCAM', descripcion: ''});
    return of (catalogo);
  }

  getOrigenTipoClacones(): Observable<OrigenClaconesModel[]> {
    let catalogo: OrigenClaconesModel[] = [];
    // catalogo.push({ id: '1', nombreOrigen: 'CAPTACION', descripcion: ''});
    catalogo.push({ id: '2', nombreOrigen: 'CARTERA', descripcion: ''});
    return of (catalogo);
  }

  getDivisaTipoClacones(): Observable<DivisaClaconesModel[]> {
    let catalogo: DivisaClaconesModel[] = [];
    catalogo.push({ id: '1', nombreDivisa: 'USD', descripcion: ''});
    return of (catalogo);
  }

  getAllCatalogosClacones() {
    return zip (
      this.getClabeTipoClacones(),
      this.getSubClaveTipoClacones(),
      this.getNombreTipoClacones(),
      this.getOrigenTipoClacones(),
      this.getDivisaTipoClacones()
    );
  }

}
