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
    <div class="container mx-auto p-4">
      @if (itemDetails$ | async; as details) { @if (details | isLoadingRequest)
      {
      <div class="text-center">
        <mat-spinner class="mx-auto"></mat-spinner>
        <p class="mt-4">Loading...</p>
      </div>
      } @else if (details | hasError) {
      <div class="text-center text-red-500">
        <p>Error loading item details</p>
      </div>
      } @else if (details | isResultRequest; ) {
      <mat-card class="max-w-2xl mx-auto">
        <mat-card-header>
          <mat-card-title>{{ details.data.name }}</mat-card-title>
          <mat-card-subtitle>Product Details</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content class="p-4">
          <div class="text-2xl font-bold text-primary mb-4">
            {{ details.data.price | currency }}
          </div>
          <p>{{ details.data.description }}</p>
        </mat-card-content>

        <mat-card-actions align="end">
          <a routerLink="/items" mat-button>
            <mat-icon>arrow_back</mat-icon>
            Back to List
          </a>
        </mat-card-actions>
      </mat-card>
      } }
    </div>
  `,
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
