import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from 'src/app/_models/apiresponse';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class APIMiddlewareInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					if (this.isAPIResponse(event.body)) {
						if (event.body.err) {
							throw ({ url: req.url, status: event.status, message: event.body.msg } as HttpErrorResponse);
						}
						const apiResponse = event.clone({ body: event.body.data });
						return apiResponse;
					}
					return event;
				}
			}),
			// retry(1),
			catchError((error: HttpErrorResponse) => {
				let errorMessage = '';
				if (error.error instanceof ErrorEvent) {
					// client-side error
					errorMessage = `Error: ${error.error.message}`;
				} else {
					// server-side error
					errorMessage = `${error.url} - ${error.status}\nMessage: ${error.message}`;
				}
				return throwError(errorMessage);
			}));
	}

	private isAPIResponse(respBody: object) {
		const responseBodyKeys = Object.keys(respBody).sort();
		const apiResponseKeys = Object.keys({ err: false, msg: '', data: [] } as APIResponse<object>).sort();
		return (JSON.stringify(responseBodyKeys) === JSON.stringify(apiResponseKeys));
	}
}
