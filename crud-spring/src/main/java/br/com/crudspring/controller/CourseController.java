package br.com.crudspring.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.crudspring.model.Courses;
import br.com.crudspring.repositories.CourseRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/courses")
public class CourseController {
	
	@Autowired
	private CourseRepository cr;
	
	@GetMapping
	public List<Courses> list(){
		return cr.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Courses> findById(@PathVariable Long id) {
		return cr.findById(id)
				.map(registro -> ResponseEntity.ok().body(registro))
				.orElse(ResponseEntity.notFound().build());
		
	}
	
	@PostMapping
	public ResponseEntity<Courses> createCourse(@RequestBody Courses course) {
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(cr.save(course));
	}
	
	
}
