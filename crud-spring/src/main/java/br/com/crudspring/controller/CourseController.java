package br.com.crudspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.crudspring.model.Courses;
import br.com.crudspring.repositories.CourseRepository;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
	
	@Autowired
	private CourseRepository cr;
	
	@GetMapping
	public List<Courses> list(){
		return cr.findAll();
	}
	
	
}
