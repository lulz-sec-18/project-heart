// import { FormService } from './form.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  // private formService: FormService;
  formClass: string = 'container';
  

 
  //toggling container class

  
  addActiveClass(): void {
    this.formClass = this.formClass + ' active';
  }
  removeActiveClass(): void {
    this.formClass = 'container';
  }
}
