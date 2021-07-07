import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmrtdPage } from './emrtd.page';

const routes: Routes = [
  {
    path: '',
    component: EmrtdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmrtdPageRoutingModule {}
