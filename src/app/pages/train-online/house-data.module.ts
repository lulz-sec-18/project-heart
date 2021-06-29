import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseDataComponent } from './house-data.component';
import { HouseDataRoutingModule } from './house-data-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared.component.module';

@NgModule({
  declarations: [HouseDataComponent],
  imports: [
    CommonModule,
    HouseDataRoutingModule,
    SharedComponentsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HouseDataModule { }
