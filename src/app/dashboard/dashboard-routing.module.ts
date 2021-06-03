import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DashboardComponent } from './dashboard.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

const routes: Routes = [
  {path:'',component: DashboardComponent},
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '/add',
        component:AddPatientComponent
      },
      {
        path: '/edit/:id',
        component:EditPatientComponent
      },
      {
        path: '/list',
        component:PatientListComponent
      },
      {
        path: '/details/:id',
        component:PatientDetailsComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
