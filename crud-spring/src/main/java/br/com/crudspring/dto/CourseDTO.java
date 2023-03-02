package br.com.crudspring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


public record CourseDTO(
		@JsonProperty("_id") Long id, 
		@NotBlank @NotNull @Size(min = 5, max=100) String name, 
		@NotNull @Size(max=20) @Pattern(regexp = "back-end|front-end|fullstack") String category, 
		@NotNull@Size(max=20) @Pattern(regexp = "Ativo|Inativo") String status) {
	
	
}
