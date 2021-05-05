import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutRoutingModule } from '../about/about-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [AngularMaterialModule,CommonModule,DashboardRoutingModule],
  exports: [],
  declarations: [DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class DashboardModule { }
