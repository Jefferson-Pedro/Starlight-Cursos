import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../sevices/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private service: CoursesService,
    private _snackBar: MatSnackBar, 
    private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit(): void { }

  public salvar() {
    this.service.salvar(this.form.value).subscribe(
      resultado =>{ this.sucessoAoSalvar()},
      error => { this.errorAoSalvar()}
    );
  }

  public cancelar() {
    this.location.back();
  }

  private errorAoSalvar(){
    this._snackBar.open('Erro ao salvar curso', '', {duration:3000});
  }
  private sucessoAoSalvar(){
    this._snackBar.open('Curso Salvo com Sucesso', '', {duration:3000});
    this.cancelar();
  }
}
