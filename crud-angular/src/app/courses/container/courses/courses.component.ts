import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../models/course';
import { CoursesService } from '../../sevices/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {


  cursos$: Observable<Course[]> | null = null;
 

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private rotaAtual: ActivatedRoute,
    private snackBar: MatSnackBar) { 

    this.refresh();
  }

  public refresh(){
    this.cursos$ = this.coursesService.listarCursos().pipe(
      catchError(error => {
       this.onError('Erro ao carregar cursos.')
        return of([])
      })
    );
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
  
  ngOnInit(): void { }

  public adicionarCurso(){
    this.router.navigate(['new'], {relativeTo: this.rotaAtual});
  }

  public editarCurso(curso: Course){
    this.router.navigate(['edit', curso._id], {relativeTo: this.rotaAtual});
  }

  public excluirCurso(curso: Course){
    this.coursesService.deletar(curso._id).subscribe({
      next: () =>  {
        this.refresh();
        this.snackBar.open('Curso Removido com Sucesso!', 'Ok', { 
          duration: 3000 ,
          verticalPosition:'top',
          horizontalPosition: 'center'
        });
      },
      error: () => this.onError('Erro ao tentar remover curso.')
    });
  }
}
