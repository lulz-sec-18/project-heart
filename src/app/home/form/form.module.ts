import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  imports: [FontAwesomeModule,CommonModule],
  exports: [],
  declarations: [FormComponent],
})
export class NameModule {
  constructor(private library:FaIconLibrary) {
      library.addIcons(faEye)
    }
    //making Icon Library

 }
