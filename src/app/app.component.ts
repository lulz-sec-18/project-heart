import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}

  detectDashboardInUrl(): boolean {
    if (this.router.url.search('dashboard') > 0)
      return true;
    else
      return false;
  }
}
