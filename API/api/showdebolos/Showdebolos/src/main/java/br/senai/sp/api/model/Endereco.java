package br.senai.sp.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table (name="tbl_endereco")
public class Endereco {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cod_endereco")
	private Long codEndereco;
	
	@NotNull
	private String endereco;
	
	@NotNull
	private int numero;
	
	private String complemento;
	
	@NotNull
	@Size(min=9, max=9, message="CEP deve estar no formato correto")
	private String cep;
	
	@NotNull
	private String bairro;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="cod_cidade")
	private Cidade cidade;

	
	public Long getCodEndereco() {
		return codEndereco;
	}

	public void setCodEndereco(Long codEndereco) {
		this.codEndereco = codEndereco;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	

	public Cidade getCidade() {
		return cidade;
	}

	public void setCidade(Cidade cidade) {
		this.cidade = cidade;
	}

	
	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	@Override
	public String toString() {
		return "Endereco [codEndereco=" + codEndereco + ", endereco=" + endereco + ", numero=" + numero
				+ ", complemento=" + complemento + ", cep=" + cep + ", bairro=" + bairro + ", cidade=" + cidade + "]";
	}

	
	
}
