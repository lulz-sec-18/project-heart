import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { EditPatientRoutingModule } from './edit-patient-routing.module';
import { EditPatientComponent } from './edit-patient.component';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, EditPatientRoutingModule],
  exports: [],
  declarations: [EditPatientComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class EditPatientModule {}
