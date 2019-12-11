package br.senai.sp.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_cidade")
public class Cidade {
	
	@Id
	@Column(name="cod_cidade")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long codCidade;
	
	private String cidade;
	
	@ManyToOne
	@JoinColumn(name="cod_estado")
	private Estado estado;

	public Long getCodCidade() {
		return codCidade;
	}

	public void setCodCidade(Long codCidade) {
		this.codCidade = codCidade;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}
	

	@Override
	public String toString() {
		return "Cidade [codCidade=" + codCidade + ", cidade=" + cidade + ", estado=" + estado + "]";
	}

	
}
