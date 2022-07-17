import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from "../../model/seguridad/session.model";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentUserSubject: BehaviorSubject<Session>;
  public currentUser: Observable<Session>;

  constructor() { 
    this.currentUserSubject = new BehaviorSubject<Session>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Session {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserValue ? true : false;
  }

  setCurrentUserInSession(usuarioSession: Session): void {
    localStorage.setItem('currentUser', JSON.stringify(usuarioSession));
    this.currentUserSubject.next(usuarioSession);
  }
}
