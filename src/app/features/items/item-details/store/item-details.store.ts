import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import {
  Observable,
  SubscriptionLike,
  catchError,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from 'src/app/core/models/item';
import { ERROR_REQUEST, LOADING_REQUEST, NOT_CALLED_REQUEST, WebRequest } from 'src/app/core/types/webrequest';
import { ItemService } from '../../data-access/items.service';

interface ItemDetailsState {
  details: WebRequest<Item>;
}

@Injectable()
export class ItemDetailsStore extends ComponentStore<ItemDetailsState> {
  readonly details$: Observable<WebRequest<Item>> = this.select(
    (state) => state.details
  );
  private readonly itemsService: ItemService = inject(ItemService);

  constructor() {
    super({ details: NOT_CALLED_REQUEST });
  }

  addDetails = this.updater((state, details: WebRequest<Item>) => ({
    ...state,
    details,
  }));

  getDetails: (value: string) => SubscriptionLike = this.effect<string>(
    (trigger$) =>
      trigger$.pipe(
        tap(() => this.addDetails(LOADING_REQUEST)),
        switchMap((id: string) =>
          this.itemsService.getItem(id).pipe(
            tap((response: Item) => {
              this.addDetails({ data: response });
            }),
            catchError((error: HttpErrorResponse) => {
              this.addDetails(ERROR_REQUEST);
              return throwError(() => error);
            })
          )
        )
      )
  );
}
