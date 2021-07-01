import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

interface ToggleMenuEvent {
  target: {
    innerText: string;
  }
}

@Component({
  selector: 'top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
})
export class TopNavigationBarComponent {
  isMenuActive: boolean = false;

  constructor(
    private authService: AuthService,
    private ngbModal: NgbModal
  ) {}

  toggleMenu(event: ToggleMenuEvent): void {
    this.isMenuActive = !this.isMenuActive;
    if (this.isMenuActive) event.target.innerText = 'close';
    else event.target.innerText = 'menu';
  }

  isLoggedIn(): boolean {
   return this.authService.isLoggedIn();
  }

  openAccountModal(): void {
    this.ngbModal.open(ProfileCardComponent)
  }

  openLoginModal(): void {
    this.ngbModal.open(LoginModalComponent);
  }
}
