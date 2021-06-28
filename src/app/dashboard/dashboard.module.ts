import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientListComponent } from './patient-list/patient-list.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    AddPatientComponent,
    EditPatientComponent,
    PatientDetailsComponent
  ],
})
export class DashboardModule {}
