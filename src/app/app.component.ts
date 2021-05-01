import { animation } from '@angular/animations';
import { Component, } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
// import { FormService } from './form.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isMenuActive: boolean = false;
  isActive: boolean = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
  }
  open(content) {
    this.modalService.open(content,{animation:true});
  }
  toggleVisiblity(el, event: any): void {
    if (el.type === 'password')
      (el.type = 'text') && (event.target.innerText = 'visibility_off');
    else (el.type = 'password') && (event.target.innerText = 'visibility');
  }
  toggleActiveClass(): boolean {
    this.isActive = !this.isActive;
    return this.isActive;
  }

  toggleMenu(event: any): void {
    this.isMenuActive = !this.isMenuActive;
    if (this.isMenuActive) event.target.innerText = 'close';
    else event.target.innerText = 'menu';
  }
  
}
