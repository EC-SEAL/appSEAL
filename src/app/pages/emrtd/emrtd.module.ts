import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmrtdPageRoutingModule } from './emrtd-routing.module';

import { EmrtdPage } from './emrtd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmrtdPageRoutingModule
  ],
  declarations: [EmrtdPage]
})
export class EmrtdPageModule {}
