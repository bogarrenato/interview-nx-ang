import { Routes } from '@angular/router';
// import { ItemDetailsComponent } from './app.component';
import { ItemListComponent } from './features/items/items-list/item-list.component';
import { ItemDetailsComponent } from './features/items/item-details/item-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemListComponent },
  { path: 'items/:id', component: ItemDetailsComponent },
];
