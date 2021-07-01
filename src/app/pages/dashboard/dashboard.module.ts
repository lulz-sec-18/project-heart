import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    PatientListComponent,
    AddPatientComponent,
    PatientDetailsComponent,
    EditPatientComponent,
    FormComponent
  ],
  entryComponents: [
    DashboardComponent,
    PatientListComponent,
    AddPatientComponent,
    PatientDetailsComponent,
    EditPatientComponent,
    FormComponent
  ]
})
export class DashboardModule {}
