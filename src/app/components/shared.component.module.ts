import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopNavigationBarComponent } from './top-navigation-bar/top-navigation-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component'
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { IonicModule } from '@ionic/angular';

 @NgModule({
   imports: [
     CommonModule,
     MatIconModule,
     AngularMaterialModule,
     AppRoutingModule,
     MatGridListModule,
     MatButtonModule,
     IonicModule
   ],

   providers: [],

   declarations: [
     FooterComponent,
     TopNavigationBarComponent,
   ],

   exports: [
     FooterComponent,
     TopNavigationBarComponent,
   ],
 })

 export class SharedComponentsModule { }
