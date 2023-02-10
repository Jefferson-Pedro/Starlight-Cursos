package br.com.crudspring.exception;

public class RegistroNaoEncontrado extends RuntimeException{
	
	private static final long SerialVersionUID = 1L;

	public RegistroNaoEncontrado(Long id) {
		super("Registro não encontrado com o id: " + id);
		
	}

	
	
}
