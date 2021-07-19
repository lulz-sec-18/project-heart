import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(public authService: AuthService,public router:Router,private ngbModal:NgbModal) { }
  
  openLoginModal() {
    this.router.navigate(['home']).then(() =>  this.ngbModal.open(LoginModalComponent));
  }

  ngOnInit(): void {}
}
