import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageIdentityDataPage } from './manage-identity-data.page';

const routes: Routes = [
  {
    path: '',
    component: ManageIdentityDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageIdentityDataPageRoutingModule {}
