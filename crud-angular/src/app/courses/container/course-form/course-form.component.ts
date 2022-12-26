import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../sevices/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder, 
    private service: CoursesService,
    private _snackBar: MatSnackBar, 
    private location: Location) {
   
  }

  ngOnInit(): void { }

  public salvar() {
    this.service.salvar(this.form.value).subscribe({
      next: ()=> { this.sucessoAoSalvar()},
      error: (error) => { this.erroAoSalvar()}
    });
  }

  public cancelar() {
    this.location.back();
  }

  private erroAoSalvar(){
    this._snackBar.open('Erro ao salvar curso', '', {duration:3000});
  }
  private sucessoAoSalvar(){
    this._snackBar.open('Curso Salvo com Sucesso', '', {duration:3000});
    this.cancelar();
  }
}

