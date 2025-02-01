import { Routes } from '@angular/router';
// import { ItemDetailsComponent } from './app.component';
import { ItemListComponent } from './features/items/items-list/item-list.component';
import { ItemDetailsComponent } from './features/items/item-details/item-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemListComponent },
  { path: 'items/:id', component: ItemDetailsComponent },
  {
    path: 'feature1',
    loadChildren: () =>
      import('@interview-workspace/featurelib1').then(
        (m) => m.featurelib1Routes
      ),
  },
  // {
  //   path: 'feature2',
  //   loadChildren: () =>
  //     import('@interview-workspace/featurelib2').then(
  //       (m) => m.Featurelib2Module
  //     ),
  // },
];
