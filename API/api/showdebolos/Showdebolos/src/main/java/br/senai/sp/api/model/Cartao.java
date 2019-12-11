package br.senai.sp.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tbl_cartao")
public class Cartao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codCartao;
	
	private String titular;
	private String numeroCartao;
	private String validade;
	private String tipo;
	public Long getCodCartao() {
		return codCartao;
	}
	public void setCodCartao(Long codCartao) {
		this.codCartao = codCartao;
	}
	public String getTitular() {
		return titular;
	}
	public void setTitular(String titular) {
		this.titular = titular;
	}
	public String getNumeroCartao() {
		return numeroCartao;
	}
	public void setNumeroCartao(String numeroCartao) {
		this.numeroCartao = numeroCartao;
	}
	public String getValidade() {
		return validade;
	}
	public void setValidade(String validade) {
		this.validade = validade;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	@Override
	public String toString() {
		return "Cartao [codCartao=" + codCartao + ", titular=" + titular + ", numeroCartao=" + numeroCartao
				+ ", validade=" + validade + ", tipo=" + tipo + "]";
	}
	
	
	
}
