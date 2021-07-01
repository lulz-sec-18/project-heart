import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainOnlineComponent } from './train-online.component';
import { TrainOnlineRoutingModule } from './train-online-routing.module';

@NgModule({
  declarations: [TrainOnlineComponent],
  imports: [
    CommonModule,
    TrainOnlineRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainOnlineModule { }
