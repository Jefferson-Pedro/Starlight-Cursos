package br.com.crudspring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.crudspring.model.Courses;

@Repository
public interface CourseRepository extends JpaRepository<Courses, Long> {
	
	
}
