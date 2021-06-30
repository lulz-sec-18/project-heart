import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
})
export class PreloaderComponent implements OnInit {

  @ViewChild('spinner-wrapper') spinner: ElementRef;

  constructor() {

    window.addEventListener('load', () => {
      let preloaderFadeOutTime = 500;
      function hidePreloader() {
        // var preloader = $('.spinner-wrapper');
        setTimeout(function () {
          this.spinner.nativeElement.fadeOut(preloaderFadeOutTime);
        }, 500);
      }
      hidePreloader();
    });
    
   }

  ngOnInit(): void {
  }

}
