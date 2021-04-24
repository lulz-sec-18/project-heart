import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  formClass: string = 'container';
  //toggling password visiblity
  toggleVisiblity(el): void {
    if (el.type === "password") el.type = "text";
    else el.type = "password";
  }
  addActiveClass(): void {
    this.formClass = this.formClass + ' active';
  }
  removeActiveClass(): void {
    this.formClass = 'container';
  }
}
