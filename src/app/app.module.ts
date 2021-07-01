import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AppFirebaseModule } from './app-firebase.module';
import { AuthService } from './services/auth.service';
import { PredictionService } from 'src/app/services/prediction.service';
import { SharedComponentsModule } from './components/shared.component.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppFirebaseModule,
    SharedComponentsModule,
    IonicModule.forRoot()
  ],
  providers: [AuthService, PredictionService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
