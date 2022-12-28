import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';

import { Course } from '../models/course';

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
    //console.log(registro);
    if(registro._id){
      //console.log('Atualizado! Uhuul');
      return this.atualizar(registro);
    }
    //console.log('Criado com sucesso, parça!');
    return this.criar(registro);
  }

  private criar(registro: Partial<Course>){
    return this.httpClient.post<Course>(this.API, registro).pipe(first());
  }

  private atualizar(registro: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${registro._id}`, registro).pipe(first());
  }

  public deletar(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
