import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Course } from '../models/course';
import { delay, first, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:8080/api/courses'
  //private readonly API = './assets/cursos.json'

  constructor(private httpClient: HttpClient) { }

  public listarCursos() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(2000),
      tap(courses => console.log(courses))
    );
  }
  
  public carregarPorId(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  public salvar(registro: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, registro).pipe(first());
  }
}
