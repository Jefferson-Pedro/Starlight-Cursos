import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../sevices/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit{
  

  cursos: Course [] = [];
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService){
   this.cursos = this.coursesService.listarCursos();
  }

  ngOnInit(): void {}
}
