package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbl_fale_conosco")
public class FaleConosco {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long codFaleConosco;
	
	private String nome;
	
	private String email;
	
	private String assunto;
	
	private String mensagem;

	
	public Long getCodFaleConosco() {
		return codFaleConosco;
	}

	public void setCodFaleConosco(Long codFaleConosco) {
		this.codFaleConosco = codFaleConosco;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAssunto() {
		return assunto;
	}

	public void setAssunto(String assunto) {
		this.assunto = assunto;
	}

	public String getMensagem() {
		return mensagem;
	}


	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}


	@Override
	public String toString() {
		return "FaleConosco [codFaleConosco=" + codFaleConosco + ", nome=" + nome + ", email=" + email + ", assunto="
				+ assunto + ", mensagem=" + mensagem + "]";
	}
	
	
	
}
