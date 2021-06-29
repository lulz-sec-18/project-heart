import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
})
export class TopNavigationBarComponent {
  modal: any;
  profileModal: any;
  isMenuActive = false;
  isActive = false;
  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
    private profileModalService: NgbModal,
    public router: Router
  ) { }

  openForm(content: TemplateRef<any>): void {
    this.modal = this.modalService.open(content, {
      animation: true,
      windowClass: 'form-modal',
      backdrop:'static',
    });
  }

  openProfile(content: any): void {
    this.profileModal = this.profileModalService.open(content, {
      animation: true,
      windowClass: 'profile-modal',
      backdrop: 'static',
    });
  }

  toggleVisiblity(el, event: any): void {
    if (el.type === 'password') (el.type = 'text') && (event.target.innerText = 'visibility_off');
    else { (el.type = 'password') && (event.target.innerText = 'visibility'); }
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

  async signUp(password, repeatPassword, userName) {
    if (password === repeatPassword) {
      await this.authService.signUp(userName, password);
      this.modal.close();
    } else window.alert("Both password doesn't match");
  }

  async signIn(userName, password) {
    await this.authService.signIn(userName, password);
    this.modal.close();
  }

  async googleAuth() {
    await this.authService.googleAuth();
    this.modal.close();
  }

  forgotPassword(userName) {
    this.authService.forgotPassword(userName);
    this.modal.close();
  }
}
