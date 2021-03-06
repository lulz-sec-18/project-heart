import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
})
export class ProfileCardComponent {

  constructor(
    public authService: AuthService,
    private ngbActiveModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.ngbActiveModal.close();
  }
}
