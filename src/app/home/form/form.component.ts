import { Component} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {

//toggling container class

  formClass: string= 'container';
  addActiveClass(): void {
    this.formClass = this.formClass + ' active';
  }
  removeActiveClass(): void {
    this.formClass = 'container';
  }
}
