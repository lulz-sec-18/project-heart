import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import {PatientListComponent} from './patient-list/patient-list.component';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, DashboardRoutingModule],
  exports: [],
  declarations: [DashboardComponent,AddPatientComponent,EditPatientComponent,PatientListComponent,PatientDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class DashboardModule {}
