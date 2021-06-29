import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { TopNavigationBarComponent } from 'src/app/components/top-navigation-bar/top-navigation-bar.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
  ],
  declarations: [
    AboutComponent
  ],
  entryComponents: [
    TopNavigationBarComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutModule { }
