import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PagesRoutes } from './pages.routing';
import { CategoriesComponent } from './categories/categories.component';
import { ServicesComponent } from './services/services.component';
import { WorkersComponent } from './workers/workers.component';
import { ModalNewComponent } from './services/modal-new/modal-new.component';
import { NewComponent } from './workers/new/new.component';
import { ServiceWorkerComponent } from './workers/new/service-worker/service-worker.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    CategoriesComponent,
    ServicesComponent,
    WorkersComponent,
    ModalNewComponent,
    NewComponent,
    ServiceWorkerComponent,
    UsersComponent
  ]
})
export class PagesModule { }
