import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  isActive: boolean = false;
  //toggling password visiblity
  toggleVisiblity(el, event: any): void {
    if (el.type === 'password') {
      el.type = 'text';
      event.target.innerText = 'visibility_off';
    } else {
      el.type = 'password';
      event.target.innerText = 'visibility';
    }
  }
  toggleActiveClass(): boolean {
    this.isActive = !this.isActive;
    return this.isActive;
  }
  // removeActiveClass(): void {
  //   this.formClass = 'container';
  // }
}
