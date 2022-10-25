import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {HistoryService} from "./history.service";

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  constructor(private historyService: HistoryService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("INTERCEPTOR")
    this.historyService.add({timestamp: new Date(), endpoint: request.urlWithParams});
    return next.handle(request);
  }
}
