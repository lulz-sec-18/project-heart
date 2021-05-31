import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { PatientListRoutingModule } from './patient-list-routing.module';
import { PatientListComponent } from './patient-list.component';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, PatientListRoutingModule],
  exports: [],
  declarations: [PatientListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class PatientListModule {}
