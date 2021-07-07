import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
})
export class PreloaderComponent {
  preloaderFadeOutTime!: number;
  @ViewChild('spinner-wrapper') spinner!: ElementRef;

  constructor() {}

  // ngAfterViewInit(): void {
  //   window.addEventListener('load', () => {
  //     this.preloaderFadeOutTime = 500;
  //     this.hidePreloader();
  //   });
  // }

  // hidePreloader(): void {
  //   setTimeout(() => {
  //     this.spinner.nativeElement.fadeOut(this.preloaderFadeOutTime);
  //   }, 500);
  // }
}
