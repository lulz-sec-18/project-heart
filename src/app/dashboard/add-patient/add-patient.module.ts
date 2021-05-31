import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { AddPatientRoutingModule } from './add-patient-routing.module';
import { AddPatientComponent } from './add-patient.component';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, AddPatientRoutingModule],
  exports: [],
  declarations: [AddPatientComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class AddPatientModule {}
