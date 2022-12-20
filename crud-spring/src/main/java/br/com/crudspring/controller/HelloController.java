package br.com.crudspring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
public class HelloController {
	
	@GetMapping
	public @ResponseBody String hello() {
		return "Olá, mundo!";
	}
}
