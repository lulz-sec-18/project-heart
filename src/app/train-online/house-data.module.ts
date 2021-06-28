import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseDataComponent } from './house-data.component';
import { AngularMaterialModule } from '../angular-material.module'
import { HouseDataRoutingModule } from './house-data-routing.module';


@NgModule({
  declarations: [HouseDataComponent],
  imports: [
    CommonModule,
    HouseDataRoutingModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HouseDataModule { }
