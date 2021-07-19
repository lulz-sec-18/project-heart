import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public _snackBar: MatSnackBar
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
        .then(() => this.ngbActiveModal.close())
        .catch((err) => {
          this._snackBar.open(err.message, '', {
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
            panelClass: ['snack-bar'],
            duration: 2000,
          });
        });
    } else
      this._snackBar.open('The password confirmation does not match ', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['toast-error'],
        duration: 2000,
      });
  }

  async signIn(userName: string, password: string) {
    await this.authService.signIn(userName, password);
    this.ngbActiveModal.close();
  }

  async googleAuth() {
    await this.authService.googleAuth();
    this.ngbActiveModal.close();
  }

  forgotPassword(userName: string) {
    this.authService.forgotPassword(userName);
    this.ngbActiveModal.close();
  }
}
