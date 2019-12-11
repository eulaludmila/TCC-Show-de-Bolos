package br.senai.sp.api.model;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class JWTRequest implements Serializable {
	
	@NotNull
	@Size(min=13, max=100, message="E-mail não pode ser nulo")
	private String username;
	
	@NotNull
	@Size(min=8, max=100, message="Senha não pode ser nula")
	private String password;

	public JWTRequest() {

	}

	public JWTRequest(String username, String password) {
		this.setPassword(password);
		this.setUsername(username);
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
