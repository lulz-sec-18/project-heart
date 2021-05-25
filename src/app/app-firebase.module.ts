import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from "../environments/environment"

@NgModule({
  declarations: [],
  imports: [AngularFireModule.initializeApp(environment.firebase)],
  exports: [AngularFireModule, AngularFireAuthModule],
})
export class AppFirebaseModule {}
