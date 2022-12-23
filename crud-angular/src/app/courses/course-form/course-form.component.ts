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
    private _snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit(): void { }

  public salvar() {
    this.service.salvar(this.form.value).subscribe(
      resultado => console.log(resultado),
      error => { this.errorAoSalvar()}
    );
  }

  public cancelar() {
    console.log('Tudo ok');
  }

  private errorAoSalvar(){
    this._snackBar.open('Erro ao salvar curso', '', {duration:3000});
  }
}
