import { Injectable, OnInit } from '@angular/core';
import { Alumno } from '../interfaces/alumno.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnos: Alumno[] = [
    {
      id: 1,
      nombre: 'Ruben Antonio',
      apellido: 'Moreno Postigo',
      email: 'moreno@gmail.com',
      fechaNacimiento: new Date(1998, 4, 23).toLocaleDateString(),
      seccion: 'A',
      nota: 16,
    },
    {
      id: 2,
      nombre: 'Jose Manuel',
      apellido: 'Raggio Bend',
      email: 'ebend@gmail.com',
      fechaNacimiento: new Date(1996, 9, 8).toLocaleDateString(),
      seccion: 'B',
      nota: 18,
    },
    {
      id: 3,
      nombre: 'Raquel Manuela',
      apellido: 'Morales Rosario',
      email: 'raqmor@hotmail.com',
      fechaNacimiento: new Date(2000, 10, 15).toLocaleDateString(),
      seccion: 'C',
      nota: 10,
    }
  ];

  ultAlumno:Alumno[]=[]

  private alumno$ = new BehaviorSubject<Alumno[]>(this.alumnos)
  private ultimoAlumno$ = new BehaviorSubject<Alumno[]| undefined>(this.ultAlumno)

  constructor() { }

  
  obtenerAlumnos():Observable<Alumno[]>{
    return this.alumno$.asObservable()
  }

  eliminarAlumno(id:number):Observable<Alumno[]|any>{
    return this.alumno$.asObservable()
      .pipe(
        map(alumnos=>alumnos.find(i=>i.id !=id))
      )
   /*  this.alumnos=[...this.alumnos]
    this.alumnos= this.alumnos.filter(elemento=>elemento.id!==i)
    return [...this.alumnos] */
  }

  ultimoAlumno(array:Alumno[]):Alumno|any{
    this.ultAlumno=[]
    const cantidadAlumnos = array.length
    this.ultAlumno.push(array[cantidadAlumnos-1])
    this.ultimoAlumno$.next(this.ultAlumno)
    return this.ultimoAlumno$
  }
  
}
