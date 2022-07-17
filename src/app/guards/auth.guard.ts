import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from "../service/seguridad/session.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //if (!this.sessionService.isAuthenticated()) {
        //    this.router.navigate(['/login']);
        //    return false;
        //s}

        return true;
    }
}