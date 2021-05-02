import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule} from '@angular/material/divider';

const materialModules = [MatIconModule,MatButtonModule,MatGridListModule,MatDividerModule];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
})
export class AngularMaterialModule {}
