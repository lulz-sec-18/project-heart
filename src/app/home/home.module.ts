import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormComponent } from './form/form.component';
import {AngularMaterialModule} from '../angular-material.module'


@NgModule({
  declarations: [HomeComponent, FormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
