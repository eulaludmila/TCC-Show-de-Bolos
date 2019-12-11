package br.senai.sp.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table (name="tbl_celular") 
public class Celular {
	
	@Id
	@Column(name="cod_celular")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long codCelular;
	
	@NotNull
	@Size(min=15, max=15, message="Celular deve estar no formato correto")
	private String celular;
	
	public Long getCodCelular() {
		return codCelular;
	}
	public void setCodCelular(Long codCelular) {
		this.codCelular = codCelular;
	}

	public String getCelular() {
		return celular;
	}
	public void setCelular(String celular) {
		this.celular = celular;
	}
	@Override
	public String toString() {
		return "Celular [codCelular=" + codCelular + ", celular=" + celular + "]";
	}
	
	

}
