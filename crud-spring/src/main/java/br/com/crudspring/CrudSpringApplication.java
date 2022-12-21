package br.com.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.com.crudsprin.model.Courses;
import br.com.crudspring.repository.CourseRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}
	
	@Bean
	CommandLineRunner initDatabase(CourseRepository cr) {
		return args => {
			
			cr.deleteAll();
			
			Courses c = new Courses();
			c.setName("Angular com Spring");
			c.setCategory("FullStack");
			
			cr.save(c);
		};
	}
}
