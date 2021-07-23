import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  profileModal: any;
  isMenuActive = false;
  isActive = false;

  constructor(
    public authService: AuthService,
    private ngbActiveModal: NgbActiveModal,
    public router: Router,
  ) {}

  toggleVisiblity(el: { type: string }, event: any): void {
    if (el.type === 'password')
      (el.type = 'text') && (event.target.innerText = 'visibility_off');
    else {
      (el.type = 'password') && (event.target.innerText = 'visibility');
    }
  }

  toggleActiveClass(): boolean {
    this.isActive = !this.isActive;
    return this.isActive;
  }

  cancel(): void {
    this.ngbActiveModal.close();
  }

  async signUp(password: string, repeatPassword: string, userName: string) {
    if (password === repeatPassword) {
      await this.authService
      .signUp(userName, password)
        .then(() => {
          this.ngbActiveModal.close();
          this.authService.openSnackbar('Sign up Successfull',false);
        })
        .catch((err) => {
          this.authService.openSnackbar(err.message);
        });
    } else
      this.authService.openSnackbar('The password confirmation does not match');
  }

  async signIn(userName: string, password: string) {
    await this.authService.signIn(userName, password).then(() => {
      this.ngbActiveModal.close();
      this.authService.openSnackbar('Sign in Successfull',false);
    }).catch((err) => {
      this.authService.openSnackbar(err.message);
    })
  }

  async googleAuth() {
    await this.authService.googleAuth().then(() => {
      this.ngbActiveModal.close();
      this.authService.openSnackbar('Sign in Successfull',false);
    })
      .catch((err) => {
      this.authService.openSnackbar(err.message);
    });
  }

  forgotPassword(userName: string) {
    this.authService.forgotPassword(userName).then(() => {
      this.ngbActiveModal.close();
      this.authService.openSnackbar('Please check your emails for reset link',false);
    }).catch((err) => {
      this.authService.openSnackbar(err.message);
    });
    
  }
}
