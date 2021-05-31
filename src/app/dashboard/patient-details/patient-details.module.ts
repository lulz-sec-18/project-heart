import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { PatientDetailsRoutingModule } from './patient-details-routing.module';
import { PatientDetailsComponent } from './patient-details.component';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, PatientDetailsRoutingModule],
  exports: [],
  declarations: [PatientDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class PatientDetailsModule {}
