import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  modal: any;
  profileModal: any;
  isMenuActive: boolean = false;
  isActive: boolean = false;
  user;

  constructor(
    public authService: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private profileModalService: NgbModal,
  ) {
    config.backdrop = 'static';
  }
  open(content) {
    this.modal = this.modalService.open(content, {
      animation: true,
      windowClass: 'form-modal',
    });
  }
  openProfile(content) {
    this.profileModal = this.profileModalService.open(content, {
      animation: true,
      windowClass: 'profile-modal',
    });
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
  ngOnInit(): void{
    this.user = this.authService.UserData
  }

  toggleMenu(event: any): void {
    this.isMenuActive = !this.isMenuActive;
    if (this.isMenuActive) event.target.innerText = 'close';
    else event.target.innerText = 'menu';
  }
  async SignUp(password, repeatPassword, userName) {
    if (password === repeatPassword) {
      await this.authService.SignUp(userName, password);
      this.modal.close();
    } else window.alert("Both password doesn't match");
  }
  async SignIn(userName, password) {
    await this.authService.SignIn(userName, password);
    this.modal.close();
  }
  async GoogleAuth() {
    await this.authService.GoogleAuth();
    this.modal.close();
  }
  ForgotPassword(userName) {
    this.authService.ForgotPassword(userName);
    this.modal.close();
    window.console.log(this.user.displayName)
  }
}
