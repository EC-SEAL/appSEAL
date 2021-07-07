import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentityReconciliationPage } from './identity-reconciliation.page';

const routes: Routes = [
  {
    path: '',
    component: IdentityReconciliationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentityReconciliationPageRoutingModule {}
