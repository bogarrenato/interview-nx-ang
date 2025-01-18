import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`);
  }
}

@Component({
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'interview-workspace';
}



@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Items</h1>
      <div class="grid gap-4">
        @for (item of items; track item.id) {
          <div class="border p-4 rounded shadow">
            <h2 class="text-xl">{{ item.name }}</h2>
            <p class="text-gray-600">Price: {{ item.price | currency }}</p>
            <a [routerLink]="['/items', item.id]" class="text-blue-500 hover:underline">
              View Details
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(
      items => this.items = items
    );
  }
}



@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      @if (item) {
        <div class="border p-6 rounded shadow">
          <h1 class="text-2xl font-bold mb-4">{{ item.name }}</h1>
          <p class="text-gray-600 mb-2">Price: {{ item.price | currency }}</p>
          <p class="mb-4">{{ item.description }}</p>
          <a routerLink="/items" class="text-blue-500 hover:underline">
            Back to List
          </a>
        </div>
      } @else {
        <p>Loading...</p>
      }
    </div>
  `
})
export class ItemDetailsComponent implements OnInit {
  item: Item | null = null;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.itemService.getItem(id).subscribe(
        item => this.item = item
      );
    });
  }
}