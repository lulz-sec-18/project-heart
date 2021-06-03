import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmailGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.authService.isLoggedIn() ||
      JSON.parse(localStorage.getItem('user')) === null
    )
      this.router.navigate(['home']);
    return true;
    
      
  }
}
