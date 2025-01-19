import { Component, Injectable, Pipe, PipeTransform } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from './core/models/item';
import {
  ErrorRequest,
  LoadingRequest,
  ResultRequest,
  WebRequest,
} from './core/types/webrequest';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'interview-workspace';
}

@Pipe({
  name: 'isLoadingRequest',
  standalone: true,
})
export class IsLoadingRequestPipe implements PipeTransform {
  transform(webRequest: WebRequest): webRequest is LoadingRequest {
    return isLoadingRequest(webRequest);
  }
}

export const isLoadingRequest = (
  webRequest: WebRequest
): webRequest is LoadingRequest => 'isLoading' in webRequest;

@Pipe({
  name: 'isResultRequest',
  standalone: true,
})
export class IsResultRequestPipe implements PipeTransform {
  transform<T>(webRequest: WebRequest<T>): webRequest is ResultRequest<T> {
    return isResultRequest(webRequest);
  }
}

export const isResultRequest = <T>(
  webRequest: WebRequest
): webRequest is ResultRequest<T> => 'data' in webRequest;

@Pipe({
  name: 'hasError',
  standalone: true,
})
export class HasErrorPipe implements PipeTransform {
  transform(webRequest: WebRequest): webRequest is ErrorRequest {
    return hasError(webRequest);
  }
}

export const hasError = (webRequest: WebRequest): webRequest is ErrorRequest =>
  'hasError' in webRequest;
