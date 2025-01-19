import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  HasErrorPipe,
  IsLoadingRequestPipe,
  IsResultRequestPipe,
} from '../../../app.component';
import { ItemDetailsStore } from './store/item-details.store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item';
import { WebRequest } from 'src/app/core/types/webrequest';

@Component({
  selector: 'app-item-details',
  standalone: true,
  providers: [ItemDetailsStore],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    IsLoadingRequestPipe,
    IsResultRequestPipe,
    HasErrorPipe,
  ],
  template: `
    <div class="item-details">
      @if (itemDetails$ | async; as details) { @if (details | isLoadingRequest)
      {
      <div class="item-details__loader">
        <mat-spinner class="item-details__spinner"></mat-spinner>
        <p class="item-details__loader-text">Loading...</p>
      </div>
      } @else if (details | hasError) {
      <div class="item-details__error">
        <p class="item-details__error-text">Error loading item details</p>
      </div>
      } @else if (details | isResultRequest;) {
      <mat-card class="item-details__card">
        <mat-card-header class="item-details__header">
          <mat-card-title class="item-details__title">{{
            details.data.name
          }}</mat-card-title>
          <mat-card-subtitle class="item-details__subtitle"
            >Product Details</mat-card-subtitle
          >
        </mat-card-header>

        <mat-card-content class="item-details__content">
          <div class="item-details__price">
            {{ details.data.price | currency }}
          </div>
          <p class="item-details__description">
            {{ details.data.description }}
          </p>
        </mat-card-content>

        <mat-card-actions align="end" class="item-details__actions">
          <a routerLink="/items" mat-button class="item-details__back-button">
            <mat-icon class="item-details__back-icon">arrow_back</mat-icon>
            Back to List
          </a>
        </mat-card-actions>
      </mat-card>
      } }
    </div>
  `,
  styles: [
    `
      .item-details {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;

        &__card {
          margin: 0 auto;
          max-width: 800px;
        }

        &__loader {
          text-align: center;
          padding: 2rem;
        }

        &__error {
          text-align: center;
          padding: 2rem;
          color: var(--mdc-theme-error);
        }

        &__header {
          padding: 1.5rem 1.5rem 0.5rem;
        }

        &__content {
          padding: 1.5rem;
        }

        &__price {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }

        &__description {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        &__actions {
          padding: 1rem;
          border-top: 1px solid var(--mdc-theme-on-surface-variant);
          opacity: 0.12;
          display: flex;
          justify-content: flex-end;
        }

        &__back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      }
    `,
  ],
})
export class ItemDetailsComponent implements OnInit {
  private readonly itemDetailsStore: ItemDetailsStore =
    inject(ItemDetailsStore);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  readonly itemDetails$: Observable<WebRequest<Item>> =
    this.itemDetailsStore.details$;

  ngOnInit(): void {
    this.itemDetailsStore.getDetails(this.activatedRoute.snapshot.params['id']);
  }
}
