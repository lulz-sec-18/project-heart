import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbPopoverModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { TopNavigationBarComponent } from './top-navigation-bar/top-navigation-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from '../angular-material.module';

 @NgModule({
   imports: [
     BrowserModule,
     CommonModule,
     NgbTooltipModule,
     NgbNavModule,
     NgbModalModule,
     NgbPopoverModule,
     MatIconModule,
     AngularMaterialModule
   ],

   providers: [],

   declarations: [
     TopNavigationBarComponent,
   ],

   entryComponents: [
     TopNavigationBarComponent,
   ],

   exports: [
     NgbTooltipModule,
     NgbNavModule,
     NgbModalModule,
     TopNavigationBarComponent,
     MatIconModule,
     AngularMaterialModule
   ],
 })

 export class SharedComponentsModule { }
