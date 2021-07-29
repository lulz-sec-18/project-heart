import { Component, ViewEncapsulation,ViewChild,OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  preloading:boolean = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('load', () => {
      this.hidePreloader();
    });
  }
  
  hidePreloader(): void {
    setTimeout(() => {
      this.preloading = false;
    }, 500);
  }

  detectAboutInUrl(): boolean {
    return this.router.url.search('about') > 0;
  }
}
