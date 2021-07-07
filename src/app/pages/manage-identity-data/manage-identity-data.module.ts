import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageIdentityDataPageRoutingModule } from './manage-identity-data-routing.module';

import { ManageIdentityDataPage } from './manage-identity-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageIdentityDataPageRoutingModule
  ],
  declarations: [ManageIdentityDataPage]
})
export class ManageIdentityDataPageModule {}
