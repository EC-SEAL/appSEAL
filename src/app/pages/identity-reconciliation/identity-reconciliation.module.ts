import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentityReconciliationPageRoutingModule } from './identity-reconciliation-routing.module';

import { IdentityReconciliationPage } from './identity-reconciliation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentityReconciliationPageRoutingModule
  ],
  declarations: [IdentityReconciliationPage]
})
export class IdentityReconciliationPageModule {}
