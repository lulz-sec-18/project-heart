import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainOnlineComponent } from './train-online.component';

const routes: Routes = [{ path: '', component: TrainOnlineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainOnlineRoutingModule { }
