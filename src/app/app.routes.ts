import { Route, Routes } from '@angular/router';
import { ItemDetailsComponent, ItemListComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemListComponent },
  { path: 'items/:id', component: ItemDetailsComponent },
];
