import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AbmAlumnosModule } from '../abm-alumnos/abm-alumnos.module';
import { TablaAlumnosModule } from '../tabla-alumnos/tabla-alumnos.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TablaAlumnosModule,
    AbmAlumnosModule
  ],
  exports:[
    DashboardComponent
  ],
})
export class DashboardModule { }
