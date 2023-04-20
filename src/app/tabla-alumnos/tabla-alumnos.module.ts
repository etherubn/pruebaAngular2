import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TablaAlumnosComponent } from './tabla-alumnos.component';




@NgModule({
  declarations: [
    TablaAlumnosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TablaAlumnosComponent
  ]
  
})
export class TablaAlumnosModule { }
