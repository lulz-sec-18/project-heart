import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredictionComponent } from './prediction.component';
import { PredictionRoutingModule } from './prediction-routing.module';


@NgModule({
  declarations: [PredictionComponent],
  imports: [
    CommonModule,
    PredictionRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PredictionModule { }
