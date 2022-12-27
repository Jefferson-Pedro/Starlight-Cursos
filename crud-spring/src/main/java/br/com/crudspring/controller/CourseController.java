package br.com.crudspring.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
				.map(registroEncontrado -> ResponseEntity.ok().body(registroEncontrado))
				.orElse(ResponseEntity.notFound().build());
		
	}
	
	@PostMapping
	public ResponseEntity<Courses> createCourse(@RequestBody Courses course) {
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(cr.save(course));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Courses> update(@PathVariable Long id, @RequestBody Courses course) {
		return cr.findById(id)
				.map(registroEncontrado -> {
					registroEncontrado.setName(course.getName());
					registroEncontrado.setCategory(course.getCategory());
					Courses updated = cr.save(registroEncontrado);
					return ResponseEntity.ok().body(updated);
				})
				.orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		return cr.findById(id)
				.map(registroEncontrado -> {
					cr.deleteById(id);
					return ResponseEntity.ok("Curso deletado!");
				})
				.orElse(ResponseEntity.notFound().build());
	}
	
}
