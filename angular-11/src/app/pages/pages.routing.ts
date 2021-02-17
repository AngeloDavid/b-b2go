import { Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { ServicesComponent } from './services/services.component';
import { WorkersComponent } from './workers/workers.component';

export const PagesRoutes: Routes = [
  {
    path: 'categorias',
    component: CategoriesComponent
  },
  {
    path: 'servicios',
    component: ServicesComponent
  },
  {
    path: 'profesionales',
    component: WorkersComponent
  }
];
