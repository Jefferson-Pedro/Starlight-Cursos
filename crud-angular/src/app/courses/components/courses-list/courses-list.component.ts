import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() cursos : Course[] = [];
  @Output() add = new EventEmitter(false);

  readonly displayedColumns = ['_id', 'name', 'category', 'actions']; //Colunas a serem exibidas

  constructor(){}

  ngOnInit(): void {}

  public adicionarCurso(){
   this.add.emit(true);
  }
}
