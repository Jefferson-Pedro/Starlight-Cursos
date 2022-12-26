import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() cursos : Course[] = [];

  readonly displayedColumns = ['_id', 'name', 'category', 'actions']; //Colunas a serem exibidas

  constructor( 
    private router: Router,
    private rotaAtual: ActivatedRoute){}

  ngOnInit(): void {}

  public adicionarCurso(){
    this.router.navigate(['new'], {relativeTo: this.rotaAtual});
  }
}
