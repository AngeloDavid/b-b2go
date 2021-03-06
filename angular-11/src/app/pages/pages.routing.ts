import { Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { ServicesComponent } from './services/services.component';
import { WorkersComponent } from './workers/workers.component';
import { NewComponent } from './workers/new/new.component';
import { UsersComponent } from './users/users.component';
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
  },
  {
    path: 'profesionales-new',
    component: NewComponent
  },
  {
    path:'profesionales/:idWorker',
    component: NewComponent
  },
  {
    path:'usuarios',
    component: UsersComponent
  }

];
