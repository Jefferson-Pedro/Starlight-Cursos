import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    name: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      category: ['', [Validators.required]]
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
    this._snackBar.open('Erro ao salvar curso', 'X', { duration: 3000 });
  }
  private sucessoAoSalvar() {
    this._snackBar.open('Curso Salvo com Sucesso', 'Ok', { duration: 3000 });
    this.cancelar();
  }
  getErrorMessage(fieldName:string) {
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo Obrigatório';
    }
    if(field?.hasError('minlength')){
      const requiredLength =  field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} characteres.`;
    }
    if(field?.hasError('maxlength')){
      const requiredLength =  field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido ser de ${requiredLength} characteres.`;
    }
    return 'Campo Inválido!';
  }
}

