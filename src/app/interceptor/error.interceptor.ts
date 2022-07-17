import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { appConstantsMessages } from '../common/const.messages';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError(error => {
                    let errorResponse = '';
                    if([400].indexOf(error.status) !== -1) {
                        let operationResult = error.error.operationResult;
                        errorResponse = `${operationResult.message}, ${operationResult.moreInfo}`;
                    } else if([500].indexOf(error.status) !== -1) {
                        let errors = error.error.errors;
                        errorResponse = `${errors[0].message}, ${errors[0].description}`;
                    } else if([0].indexOf(error.status) !== -1) {
                        errorResponse = appConstantsMessages['carga.masiva.error.generico'];
                    } else {
                        errorResponse = appConstantsMessages['carga.masiva.error.generico'];
                    }
                    return throwError(()=>errorResponse);
                })
            )
    }
}
