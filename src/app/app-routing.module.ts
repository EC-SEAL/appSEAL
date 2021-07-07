import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:UUID',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'datastore/:UUID',
    loadChildren: () => import('./pages/datastore/datastore.module').then( m => m.DatastorePageModule)
  },
  {
    path: 'manage-identity-data/:UUID',
    loadChildren: () => import('./pages/manage-identity-data/manage-identity-data.module').then( m => m.ManageIdentityDataPageModule)
  },
  {
    path: 'emrtd/:param',
    loadChildren: () => import('./pages/emrtd/emrtd.module').then( m => m.EmrtdPageModule)
  },
  {
    path: 'identity-reconciliation/:UUID',
    loadChildren: () => import('./pages/identity-reconciliation/identity-reconciliation.module').then( m => m.IdentityReconciliationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
