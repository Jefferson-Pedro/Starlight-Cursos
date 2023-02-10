package br.com.crudspring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.crudspring.exception.RegistroNaoEncontrado;
import br.com.crudspring.model.Courses;
import br.com.crudspring.repositories.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {

	private CourseRepository cr;

	public CourseService(CourseRepository cr) {
		this.cr = cr;
	}

	public List<Courses> list() {
		return cr.findAll();
	}

	public Courses findById(@PathVariable @NotNull @Positive Long id) {
		return cr.findById(id).orElseThrow(() -> new RegistroNaoEncontrado(id));
	}

	public Courses createCourse( @Valid Courses course) {
		return cr.save(course);
	}
	
	public Courses update( @NotNull @Positive Long id, 
							@Valid Courses course) {
		
		return cr.findById(id)
				.map(registroEncontrado -> {
					registroEncontrado.setName(course.getName());
					registroEncontrado.setCategory(course.getCategory());
					return cr.save(registroEncontrado);
				}).orElseThrow(() -> new RegistroNaoEncontrado(id));
	}
	
	public void delete(@PathVariable  @NotNull @Positive Long id) {
		
		cr.delete(cr.findById(id).orElseThrow(() -> new RegistroNaoEncontrado(id)));
		
	}

}
