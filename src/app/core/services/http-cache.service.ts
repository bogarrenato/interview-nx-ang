import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export enum CacheExceptions {
  'login/captchaimage',
}

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private requests: any = {};

  put(url: string, response: HttpResponse<any>): void {
    let isException = false;
    for (const exception in CacheExceptions) {
      if (isNaN(Number(exception)) && url.includes(exception)) {
        isException = true;
      }
    }
    if (!isException) {
      this.requests[url] = response;
    }
  }

  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }

  invalidateCache(): void {
    this.requests = {};
  }
}
