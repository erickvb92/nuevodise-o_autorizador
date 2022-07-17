import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Constancia } from '../../../model/constancia.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessCartService {

  private currentConstancySubject = new BehaviorSubject<Constancia[]>([]);
  currentConstancy$ = this.currentConstancySubject.asObservable();

  constructor() { }

  getSessionActive(nameSession: string) {
    return sessionStorage.getItem(nameSession);
  }

  removeSessionActive(nameSession: string) {
    console.log(nameSession)
    sessionStorage.removeItem(nameSession);
    this.getTotalConstancies();
  }

  saveConstancias(data: Constancia[], nameSession: string){
    const currentSession = this.getSessionActive(nameSession);
    if(currentSession) {
      let newSession: Constancia[] = JSON.parse(currentSession);
      data.forEach(constancia => {
        if(!newSession.find((consta) => consta.id === constancia.id)) {
          newSession = [
            ...newSession,
            constancia
          ];
        }
      });
      this.removeSessionActive(nameSession);
      sessionStorage.setItem(nameSession, JSON.stringify(newSession));
      this.getTotalConstancies();
    } else {
      sessionStorage.setItem(nameSession, JSON.stringify(data));
      this.getTotalConstancies();
    }
  }

  deleteConstancia(id: number | string, nameSession: string) {
    const currentSession = this.getSessionActive(nameSession);
    if(currentSession) {
      let newSession:Constancia[] = JSON.parse(currentSession);
      const index = newSession.findIndex( constancia => constancia.id === id);
      newSession.splice(index, 1);
      this.removeSessionActive(nameSession);
      sessionStorage.setItem(nameSession, JSON.stringify(newSession));
      this.getTotalConstancies();
    }
  }

  getTotalConstancies() {
    let modifySession = this.getSessionActive('constancias-modificadas');
    let cancelSession = this.getSessionActive('constancias-canceladas');
    let modifyConstancies = modifySession ? JSON.parse(modifySession) : [];
    let cancelConstancies = cancelSession ? JSON.parse(cancelSession) : [];
    const total  = [
      ...modifyConstancies,
      ...cancelConstancies
    ];
    this.currentConstancySubject.next(total);
  }

  getConstanciasSearch(nameSession: string, search: string){
    const currentSession = this.getSessionActive(nameSession);
    let result;
    if(currentSession) {
      let constancies: Constancia[] = JSON.parse(currentSession);
      result = constancies.filter( constancy => constancy.folio.toUpperCase().includes(search.toUpperCase()));
    }
    return of (result);
  }

  processConstancy(index: number, constancia: Constancia, nameSession: string) {
    this.deleteConstancia(index, nameSession);
    const rta = {
      message: 'Constancia Procesada',
      contancia: constancia
    };

    return of (rta);
  }

  processAllConstancies(nameSession: string) {
    this.removeSessionActive(nameSession);
    const rta = {
      message: 'Constancias Procesadas',
    };

    return of (rta);
  }
}
