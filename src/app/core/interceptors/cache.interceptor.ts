import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { HttpCacheService } from "../services/http-cache.service";

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    const cacheService = inject(HttpCacheService);
  
    if (req.method !== 'GET') {
      cacheService.invalidateCache();
      return next(req);
    }
  
    const cachedResponse = cacheService.get(req.urlWithParams);
    
    if (cachedResponse) {
      return of(cachedResponse);
    }
  
    return next(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          cacheService.put(req.urlWithParams, event);
        }
      })
    );
  };
  