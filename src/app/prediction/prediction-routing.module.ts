import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictionComponent } from './prediction.component';

const routes: Routes = [{ path: '', component: PredictionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictionRoutingModule { }
