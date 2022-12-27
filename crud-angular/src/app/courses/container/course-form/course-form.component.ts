import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';

import { CoursesService } from '../../sevices/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const curso: Course = this.route.snapshot.data['curso'];
   this.form.setValue({
    _id:curso._id,
    name: curso.name,
    category: curso.category
   });
  }

  public salvar() {
    this.service.salvar(this.form.value).subscribe({
      next: () => { this.sucessoAoSalvar() },
      error: (error) => { this.erroAoSalvar() }
    });
  }

  public cancelar() {
    this.location.back();
  }

  private erroAoSalvar() {
    this._snackBar.open('Erro ao salvar curso', '', { duration: 3000 });
  }
  private sucessoAoSalvar() {
    this._snackBar.open('Curso Salvo com Sucesso', '', { duration: 3000 });
    this.cancelar();
  }
}

