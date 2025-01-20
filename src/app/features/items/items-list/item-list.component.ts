import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { Item } from 'src/app/core/models/item';
import { ItemService } from '../data-access/items.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatBadgeModule,
  ],
  template: `
    <div class="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold mb-2 text-center">Our Products</h1>
        <p class="text-center text-gray-600 mb-8">
          Discover our premium selection
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (item of items; track item.id) {
          <mat-card
            class="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            matRipple
            [@cardAnimation]
          >
            <div class="relative">
              <!-- Product Image Placeholder -->
              <div
                class="bg-gradient-to-br from-indigo-100 to-purple-100 h-48 flex items-center justify-center"
              >
                <mat-icon class="text-6xl text-indigo-300">devices</mat-icon>
              </div>

              <!-- Price Badge -->
              <div class="absolute top-4 right-4">
                <span
                  class="bg-white px-4 py-2 rounded-full shadow-md text-indigo-600 font-bold"
                >
                  {{ item.price | currency }}
                </span>
              </div>
            </div>

            <mat-card-header class="pb-0">
              <mat-card-title>
                <h2 class="text-xl font-bold text-gray-800 my-2">
                  {{ item.name }}
                </h2>
              </mat-card-title>
            </mat-card-header>

            <mat-card-content class="px-6 py-4">
              <p class="text-gray-600 line-clamp-2">{{ item.description }}</p>
            </mat-card-content>

            <mat-card-actions
              class="p-6 pt-0 flex justify-between items-center"
            >
              <div class="flex items-center space-x-2">
                <mat-icon class="text-green-500">check_circle</mat-icon>
                <span class="text-sm text-green-500">In Stock</span>
              </div>
              <a
                [routerLink]="['/items', item.id]"
                mat-raised-button
                color="primary"
                class="rounded-full"
              >
                <mat-icon>visibility</mat-icon>
                <span class="ml-1">Details</span>
              </a>
            </mat-card-actions>
          </mat-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      mat-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        border: none;
      }

      .mat-mdc-card {
        --mdc-elevated-card-container-color: transparent;
      }

      .text-6xl {
        font-size: 4rem;
      }

      /* Modern shadows */
      .shadow-lg {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }

      .shadow-xl {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
    `,
  ],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate(
          '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe((items) => (this.items = items));
  }
}
