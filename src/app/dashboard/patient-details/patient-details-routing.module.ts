import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientDetailsComponent } from './patient-details.component';

const routes: Routes = [{ path: '', component: PatientDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDetailsRoutingModule {}
