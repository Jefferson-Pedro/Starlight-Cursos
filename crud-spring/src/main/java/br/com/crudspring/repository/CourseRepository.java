package br.com.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import br.com.crudsprin.model.Courses;

@Repository
public interface CourseRepository extends JpaRepository<Courses, Long> {
	
	
}
