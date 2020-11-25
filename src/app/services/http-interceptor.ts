import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.changeLoaderState({ state: true })
        request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')
        });
        return next.handle(request).pipe(tap((res) => {
            this.loaderService.changeLoaderState({ state: false })
        }))
    }
}