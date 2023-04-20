import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnosComponent } from '../abm-alumnos/abm-alumnos.component';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../interfaces/alumno.interface';
import { AlumnosService } from '../services/alumnos.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';



@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.scss'],
})
export class TablaAlumnosComponent implements OnDestroy{

  dataSource = new MatTableDataSource<Alumno>();

  alumnoNew$: Observable<[]>

  private alumnosSubscription: Subscription
  private destroyed$ = new Subject()

  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'email',
    'fechaNacimiento',
    'seccion',
    'nota',
    'editar',
    'eliminar',
  ];

  constructor(private matDialog: MatDialog, private alumnoService:AlumnosService) {
    this.alumnosSubscription = this.alumnoService.obtenerAlumnos().subscribe(alumnos=>{
      this.dataSource.data= alumnos
    })
    this.alumnoNew$=this.alumnoService.ultimoAlumno(this.dataSource.data)
  }
  ngOnDestroy(): void {
    this.alumnosSubscription?.unsubscribe()
    this.destroyed$.next(true)
  }
  
  abrirABMAlumnos() {
    const dialog = this.matDialog.open(AbmAlumnosComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            id: this.dataSource.data.length + 1,
            ...result,
            
          }
        ];
        this.alumnoNew$ = this.alumnoService.ultimoAlumno(this.dataSource.data)
      }
    });
  }

  
  eliminarAlumno(id:number):void {
    this.alumnoService.eliminarAlumno(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        alumnos=>{
          this.dataSource.data=[alumnos]
          this.alumnoNew$ = this.alumnoService.ultimoAlumno(this.dataSource.data)
        }
      )
  }

  editarAlumno(i: number) {
    const dialog = this.matDialog.open(AbmAlumnosComponent);
    dialog.afterClosed().subscribe((valor: Alumno) => {
      if (valor) {
        this.dataSource.data=[...this.dataSource.data]
        this.dataSource.data[i] = {
          id:i+1,
          nombre: valor.nombre,
          apellido: valor.apellido,
          email: valor.email,
          fechaNacimiento: valor.fechaNacimiento,
          seccion: valor.seccion,
          nota: valor.nota,
        };
        this.dataSource.data=[...this.dataSource.data]
      }
    });
  }

  
}
