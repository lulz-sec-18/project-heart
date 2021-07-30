import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TopNavigationBarComponent } from './top-navigation-bar/top-navigation-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component'
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app-routing.module';
// import { IonicModule } from '@ionic/angular';
import { PreloaderComponent } from './preloader/preloader.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    AngularMaterialModule,
    AppRoutingModule,
    // IonicModule.forRoot()
  ],
  declarations: [
    ConfirmModalComponent,
    FooterComponent,
    TopNavigationBarComponent,
    PreloaderComponent,
    LoginModalComponent,
    ProfileCardComponent
  ],
  exports: [
    FooterComponent,
    TopNavigationBarComponent,
    PreloaderComponent,
    LoginModalComponent,
    ProfileCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 })

 export class SharedComponentsModule { }
