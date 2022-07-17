import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Utilerias } from '../common/utilerias';
import { SessionService } from '../service/seguridad/session.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    private excludedUrlsRegex: RegExp[];
    private excludedUrls = [ ".svg" ]; 

    constructor(
        private _utilerias: Utilerias,
        private _sessionService: SessionService) { 
            this.excludedUrlsRegex = this.excludedUrls.map(urlPattern => new RegExp(urlPattern, 'i')) || [];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const passThrough: boolean = !!this.excludedUrlsRegex.find(regex => regex.test(request.url));
        if (passThrough) {
            return next.handle(request);
        }
        this._utilerias.showLoading();
        const requestUrl = request.url; 
        let httpHeaders = new HttpHeaders()
        .set('X-Content-Type-Options', `nosniff`)
        .set('Strict-Transport-Security', `max-age=63072000`)
        .set('Content-Security-Policy', `default-src 'self'; img-src https://*; child-src 'none';`)
        .set('X-Frame-Options', `DENY`);
        //.set('Authorization', `Bearer ${this._sessionService.currentUserValue.sessionToken}`);
        const apiRequest = request.clone({ 
            headers: httpHeaders,
            url: request.url
        });
        return next.handle(apiRequest)
            .pipe(
                finalize(() => this._utilerias.closeLoading())
            );
    }
}
