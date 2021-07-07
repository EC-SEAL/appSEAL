import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatastorePage } from './datastore.page';

const routes: Routes = [
  {
    path: '',
    component: DatastorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatastorePageRoutingModule {}
