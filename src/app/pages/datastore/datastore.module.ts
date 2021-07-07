import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatastorePageRoutingModule } from './datastore-routing.module';

import { DatastorePage } from './datastore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatastorePageRoutingModule
  ],
  declarations: [DatastorePage]
})
export class DatastorePageModule {}
